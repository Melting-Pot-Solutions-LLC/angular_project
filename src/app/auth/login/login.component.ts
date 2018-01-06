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

    constructor(private authService: AuthService,
                private accountService: AccountService,
                private router: Router) {
    }

    ngOnInit() {
    }

    onLogin(ngForm: NgForm) {
        const email = ngForm.value.email;
        const password = ngForm.value.password;
        this.authService.login(email, password)
            .subscribe(user => {
                    this.router.navigate(['/user-profile']);
                    this.accountService.setupDefaultAccount(user.uid);
                    this.authService.setAuthState(user);
                }, error => {
                    this.errorMessage = error;
                }
            );
    }
}
