import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {AccountService} from '../../accounts/account.service';
import {Router} from '@angular/router';
import {Account} from '../../accounts/account.model';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test: Date = new Date();
    errorMessage: string = null;
    email: string;
    password: string;

    constructor(private authService: AuthService,
                private accountService: AccountService,
                private router: Router) { }

    ngOnInit() {}

    onRegister() {
        this.authService.signUp(this.email, this.password)
            .subscribe(user => {
                this.authService.login(this.email, this.password).subscribe(loggedUser => {
                        this.router.navigate(['/user-profile']);
                        this.accountService.saveNewAccount(loggedUser.uid);
                        this.authService.setAuthState(loggedUser);
                    }, error => {
                        this.errorMessage = error;
                    }
                );
            }, error => {
                this.errorMessage = error;
            }
        );
    }
}
