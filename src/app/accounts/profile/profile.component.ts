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
    defaultAccount: Account;
    isDataAvailable = false;

    constructor(private accountService: AccountService,
                private uploadService: UploadService) {
    }

    ngOnInit() {
        this.accountService.currentAccount.subscribe(account => {
            this.account = account;
            this.defaultAccount = this.accountService.getDefaultAccount();
            if (this.account.image) {
                console.log(this.account.image);
                this.uploadService.getAccountImage(account).subscribe(image => {
                    this.data = image;
                });
            }
            this.isDataAvailable = true;
        });
    }

}
