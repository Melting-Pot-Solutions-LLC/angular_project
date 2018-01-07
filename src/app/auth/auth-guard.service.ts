import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {log} from 'util';
import {AccountService} from '../accounts/account.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router,
                public auth: AngularFireAuth,
                private accountService: AccountService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.auth.authState.map((auth) =>  {
            if (auth == null) {
                this.router.navigate(['/landing']);
                return false;
            } else {
                this.accountService.getAccountById(auth.uid).subscribe(account => {
                    this.accountService.changeAccount(account);
                });
                return true;
            }
        });
    }
}
