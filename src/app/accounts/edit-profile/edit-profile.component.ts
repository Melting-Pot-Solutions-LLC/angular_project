/*******************************************
** Author            : Melting Pot Solutions LLC
** Last modified     : 09/05/2018
**
********************************************/

import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountService} from '../account.service';
import {Account} from '../account.model';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditProfilePhotoComponent} from './edit-profile-photo/edit-profile-photo.component';
import {UploadService} from '../upload.service';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
    @ViewChild('accountForm') accountForm: NgForm;

    data: any;

    account: Account;
    defaultAccount: Account;
    isDataAvailable = false;

    constructor(private accountService: AccountService,
                private router: Router,
                private modalService: NgbModal,
                private uploadService: UploadService) {
        this.data = {};
    }

    ngOnInit() {
        this.accountService.currentAccount.subscribe(account => {
            this.account = account;
            this.defaultAccount = this.accountService.getDefaultAccount();
            if (this.account.image) {
                this.uploadService.getAccountImage(account).subscribe(image => {
                    this.data = image;
                });
            }
            this.isDataAvailable = true;
        });
    }

    onSave() {
        this.account.title = this.accountForm.value.accountTitle || '';
        this.account.description = this.accountForm.value.accountDescription || '';
        this.account.fees = this.accountForm.value.accountFees || '';
        this.account.phone = this.accountForm.value.accountPhone || '';
        this.account.address = this.accountForm.value.accountAddress || '';
        this.account.website = this.accountForm.value.accountWebsite || '';
        this.account.facebook = this.accountForm.value.accountFacebook || '';
        this.accountService.updateAccount(this.account);

        if (this.data && this.data.image) {
            const fixedImg = this.data.image.split(/,(.+)/)[1];
            if (this.data && fixedImg) {
                // console.log('uploadddddd');
                this.uploadService.uploadAccountImage(this.account, fixedImg);
            }
        }
        this.router.navigate(['/user-profile'])
    }

    open() {
        const modalRef = this.modalService.open(EditProfilePhotoComponent);
        this.data = modalRef.componentInstance.data;
    }
}
