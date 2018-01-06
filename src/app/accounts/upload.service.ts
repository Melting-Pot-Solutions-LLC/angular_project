import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import * as firebase from 'firebase/app'
import 'firebase/storage'
import {AccountService} from './account.service';

@Injectable()
export class UploadService {

    constructor(private db: AngularFireDatabase,
                private accountService: AccountService) {
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

        this.accountService.getAccountById(account.id).subscribe(
            account => {
                if (account.image.path != null) {
                    const pathReference = storage.ref(account.image.path);
                    pathReference.getDownloadURL().then(url => {
                        const result = {image: url, path: account.image.path, filename: account.image.filename};
                        resultSubject.next(result);
                    })
                }
            }
        );
        return resultSubject;
    }
}
