/*******************************************
** Author            : Melting Pot Solutions LLC
** Last modified     : 09/05/2018
**
********************************************/

import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Account} from './account.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AccountService {
    accounts: Observable<any[]>;
    defaultAccount: Account;

    private accountSource = new BehaviorSubject<Account>(new Account());
    currentAccount = this.accountSource.asObservable();
    changeAccount(account: Account) {
        this.accountSource.next(account)
    }

    constructor(private db: AngularFireDatabase) {
        this.accounts = db.list('accounts').valueChanges();
        this.defaultAccount = new Account();
    }

    getAccounts(): Observable<any[]> {
        return this.db.list('accounts', ref => ref.orderByChild('total_price')).valueChanges()
    }

    saveAccount(account: Account) {
        this.db.object('/accounts/' + account.id).set(account);
        this.changeAccount(account);
    }

    updateAccount(account: Account) {
        this.db.object('/accounts/' + account.id).update(account);
        this.changeAccount(account);
        this.defaultAccount = account;
    }

    getAccountById(id: string): Observable<any> {
        return this.db.object('/accounts/' + id).valueChanges();
    }

    getDefaultAccount(): Account {
        this.defaultAccount.title = 'Your company title';
        this.defaultAccount.description = 'Your company description';
        this.defaultAccount.phone = 'Your company phone number';
        this.defaultAccount.address = 'Your company physical addres';
        this.defaultAccount.website = 'Your company website';
        this.defaultAccount.facebook = 'Your company facebook';
        this.defaultAccount.fees = 0;
        return this.defaultAccount;
    }

    saveNewAccount(id: string) {
        const account = new Account();
        account.id = id;
        account.title = '';
        account.description = '';
        account.fees = 0;
        account.rating = 0;
        this.saveAccount(account);
    }
}
