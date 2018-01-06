import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {AccountService} from '../../accounts/account.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test: Date = new Date();
    errorMessage: string = null;

    constructor(private authService: AuthService,
                private accountService: AccountService,
                private router: Router) { }

    ngOnInit() {}

    onRegister(ngForm: NgForm) {
        const email = ngForm.value.email;
        const password = ngForm.value.password;
        this.authService.signUp(email, password)
            .subscribe(user => {
                this.authService.login(email, password).subscribe(loggedUser => {
                        this.router.navigate(['/user-profile']);
                        this.accountService.setupDefaultAccount(loggedUser.uid);
                        this.accountService.defaultAccount.id = loggedUser.uid;
                        this.accountService.defaultAccount.email = loggedUser.email;
                        this.accountService.saveAccount(this.accountService.defaultAccount);
                        this.authService.setAuthState(loggedUser);
                    }
                );
            }, error => {
                this.errorMessage = error;
            }
        );
    }
}
