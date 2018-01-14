import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertsService } from '@jaspero/ng2-alerts/dist';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    test: Date = new Date();
    email: string;
    errorMessage: string = null;

    constructor(private authService: AuthService,
                private router: Router,
                private alert: AlertsService) {
    }

    ngOnInit() {
    }

    onResetPassword() {
        this.authService.resetPassword(this.email)
            .subscribe(result => {
                console.log('reset password');
                this.alert.create('success', 'Please check your mailbox.', {
                    overlay: true,
                    overlayClickToClose: true,
                    showCloseButton: true,
                    duration: 10000
                });
                setTimeout(() => this.router.navigate(['/login']), 1000);
            }, error => this.errorMessage = error);
    }

}
