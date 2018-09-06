/*******************************************
** Author            : Melting Pot Solutions LLC
** Last modified     : 09/05/2018
**
********************************************/

import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import * as firebase from 'firebase/app'
import 'firebase/storage'
import {AccountService} from './account.service';
import {Account} from './account.model';

@Injectable()
export class UploadService {

    constructor(private db: AngularFireDatabase) {
    }

    uploadAccountImage(account, image) {
        const storageRef = firebase.storage().ref();

        const db = this.db;
        const path = `/account/${account.id}`;
        const iRef = storageRef.child(path);
        iRef.putString(image, 'base64', {contentType: 'image/png'}).then((snapshot) => {
            db.object(`accounts/${account.id}/image`).update({path: path, filename: account.id})
        });
    }

    getAccountImage(account: Account): ReplaySubject<any> {
        const resultSubject = new ReplaySubject(1);
        const storage = firebase.storage();
        if (account.image) {
            const pathReference = storage.ref(account.image.path);
            pathReference.getDownloadURL().then(url => {
                const result = {image: url, path: account.image.path, filename: account.image.name};
                resultSubject.next(result);
            })
        }
        return resultSubject;
    }
}
