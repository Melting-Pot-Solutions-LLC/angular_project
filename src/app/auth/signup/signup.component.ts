import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';
import {AccountService} from '../../accounts/account.service';
import {Router} from '@angular/router';
import {Account} from '../../accounts/account.model';
import { AlertsService } from '@jaspero/ng2-alerts/dist';

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
    confirmPassword: string;
    form: FormGroup;

    constructor(private authService: AuthService,
                private accountService: AccountService,
                private router: Router,
                private alert: AlertsService,
                fb: FormBuilder) 
    {

    }

    ngOnInit() {}

    onRegister() {
        this.authService.signUp(this.email, this.password)
            .subscribe(user => {
                this.accountService.saveNewAccount(user.uid);
                this.authService.sendEmailVerification();
                this.authService.logout();
                this.alert.create('success', 'Please check your mailbox to verify account.', {
                    overlay: true,
                    overlayClickToClose: true,
                    showCloseButton: true,
                    duration: 10000
                });
                setTimeout(() => this.router.navigate(['/login']), 1000);
            }, error => {
                this.errorMessage = error;
            }
        );
    }
}
