const functions = require('firebase-functions');
const firebaseAdmin = require("firebase-admin");

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