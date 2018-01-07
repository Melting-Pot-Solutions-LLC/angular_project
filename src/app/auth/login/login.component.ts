import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {AccountService} from '../../accounts/account.service';

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

    constructor(private authService: AuthService,
                private accountService: AccountService,
                private router: Router) {
    }

    ngOnInit() {
    }

    onLogin() {
        this.authService.login(this.email, this.password)
            .subscribe(user => {
                    this.router.navigate(['/user-profile']);
                    this.accountService.getAccountById(user.uid).subscribe(account => {
                        this.accountService.changeAccount(account);
                    });
                    this.authService.setAuthState(user);
                }, error => {
                    this.errorMessage = error;
                }
            );
    }
}
