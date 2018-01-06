import {Component, OnInit} from '@angular/core';
import {AccountService} from '../account.service';
import {Account} from '../account.model';
import {AuthService} from '../../auth/auth.service';
import {UploadService} from '../upload.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    data: any;

    account: Account;
    isDataAvailable = false;
    isImageAvailable = false;

    constructor(private accountService: AccountService,
                private authService: AuthService,
                private uploadService: UploadService) {
    }

    ngOnInit() {
        this.accountService.getAccountById(this.authService.currentUserId)
            .subscribe(account => {
                this.account = account;
                this.isDataAvailable = true;
                this.uploadService.getAccountImage(account).subscribe(image => {
                    this.data = image;
                    this.isImageAvailable = true;
                });
            });
    }

}
