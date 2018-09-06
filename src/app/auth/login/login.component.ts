/*******************************************
** Author            : Melting Pot Solutions LLC
** Last modified     : 09/05/2018
**
********************************************/

import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {AccountService} from '../../accounts/account.service';
import { AlertsService } from '@jaspero/ng2-alerts/dist';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    test: Date = new Date();
    errorMessage: string = null;
    email: string;
    password: string;
    isVerified: boolean;
    user: Object;

    constructor(private authService: AuthService,
                private accountService: AccountService,
                private router: Router,
                private alert: AlertsService) {
    }

    ngOnInit() {
        this.isVerified = true;
    }

    onLogin() {
        this.authService.login(this.email, this.password)
            .subscribe(user => {
                    // console.log(user);
                    if (user.emailVerified) {
                        this.router.navigate(['/user-profile']);
                        this.accountService.getAccountById(user.uid).subscribe(account => {
                            this.accountService.changeAccount(account);
                        });
                        this.authService.setAuthState(user);
                    } else {
                        this.authService.logout();
                        this.errorMessage = 'Please verify your email address.';
                        this.isVerified = false;
                    }
                }, error => {
                    this.errorMessage = error;
                }
            );
    }

    onVerify() {
        this.authService.login(this.email, this.password)
            .subscribe(user => {
                    this.authService.sendEmailVerification();
                    this.authService.logout();
                    // console.log('verify');
                    this.alert.create('success', 'Please check your mailbox.', {
                        overlay: true,
                        overlayClickToClose: true,
                        showCloseButton: true,
                        duration: 10000
                    });
                    this.errorMessage = null;
                }, error => {
                    this.errorMessage = error;
                }
            );
    }
}
