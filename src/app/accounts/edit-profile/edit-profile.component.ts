import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountService} from '../account.service';
import {Account} from '../account.model';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditProfilePhotoComponent} from './edit-profile-photo/edit-profile-photo.component';
import {UploadService} from '../upload.service';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
    data: any;

    account: Account;
    isDataAvailable = false;

    constructor(private accountService: AccountService,
                private authService: AuthService,
                private router: Router,
                private modalService: NgbModal,
                private uploadService: UploadService) {
        this.data = {};
    }

    ngOnInit() {
        this.accountService.getAccountById(this.authService.currentUserId)
            .subscribe(account => {
                this.account = account;
                this.uploadService.getAccountImage(account).subscribe(image => {
                    this.data = image;
                });
                this.isDataAvailable = true;
            });
    }

    onSave() {
        const fixedImg = this.data.image.split(/,(.+)/)[1];
        this.accountService.updateAccount(this.account);
        if (this.data && fixedImg) {
            console.log('uploadddddd');
            this.uploadService.uploadAccountImage(this.account, fixedImg);
        }
        this.router.navigate(['/user-profile'])
    }

    open() {
        const modalRef = this.modalService.open(EditProfilePhotoComponent);
        this.data = modalRef.componentInstance.data;
    }
}
