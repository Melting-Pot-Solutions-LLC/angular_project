import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Account} from './account.model';

@Injectable()
export class AccountService {
    accounts: Observable<any[]>;
    defaultAccount: Account;

    constructor(private db: AngularFireDatabase) {
        this.accounts = db.list('accounts').valueChanges();
        this.defaultAccount = new Account();
    }

    saveAccount(account: Account) {
        this.db.object('/accounts/' + account.id).set(account);
    }

    updateAccount(account: Account) {
        this.db.object('/accounts/' + account.id).update(account);
    }

    getAccountById(id: string): Observable<any> {
        return this.db.object('/accounts/' + id).valueChanges();
    }

    setupDefaultAccount(id: string) {
        this.defaultAccount.id = id;
        this.defaultAccount.title = 'Your company title';
        this.defaultAccount.description = 'Your company description';
        this.defaultAccount.fees = 0;
        this.defaultAccount.image = {path: '', name: ''};
    }
}
