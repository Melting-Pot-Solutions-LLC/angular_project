const functions = require('firebase-functions');
const firebaseAdmin = require("firebase-admin");
const request = require('request');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(require("./config/firebase-admin-config.json")),
    databaseURL: "https://quoteliproj.firebaseio.com"
});

exports.onUserCreated = functions.auth.user().onCreate(event => {
    let request = firebaseAdmin.auth().getUser(event.data.uid)
        .then(function(user) {
            let email;

            for (var provider of user.providerData) {
                if (provider.email) {
                    email = provider.email;
                }
            }

            firebaseAdmin.database().ref('accounts/' + user.uid).update({
                email: email,
            });
        })
        .catch(function(error) {
            console.error("Error Fetching User: ", error);
        });

    return request;
});

exports.onUserRequest = functions.database.ref('/userRequests/{requestId}').onCreate(event => {
    return new Promise((resolve, reject) => {
        let requestData = event.data.val();
        // console.log(requestData.userEmail);
        // console.log(requestData.companyEmail);

        // For client

        request(
            {
                url: 'https://api.elasticemail.com/v2/email/send',
                method: "POST",
                json: {
                    apikey: "020b2211-f473-4c84-9077-daadecad038b",
                    template: "11517",
                    to: requestData.userEmail
                }
            },
            function (error, response, body) {
                // console.log(response);
                // console.log('error');
                // console.log('response');
                // console.log(error);
                // console.log('fires');
                if (!error && response.statusCode == 200) {
                    // console.log(body)
                    resolve();
                }
                reject();
            }
        );

    });
});
