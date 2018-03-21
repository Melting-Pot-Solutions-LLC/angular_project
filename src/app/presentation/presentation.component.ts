import {Component, EventEmitter, OnInit} from '@angular/core';
import { JasperoAlertsModule, AlertsService } from '@jaspero/ng2-alerts';
import {Router} from '@angular/router';
import {
    trigger,
    style,
    animate,
    transition
} from '@angular/animations';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {AngularFireDatabase} from 'angularfire2/database';
import {AccountService} from '../accounts/account.service';
import {Account} from '../accounts/account.model';
import {UploadService} from '../accounts/upload.service';
import {ActionFormModel} from '../shared/models/action-form.model';
import {ActionFormService} from '../shared/services/action-form.service';


declare var jquery:any;
declare var $:any;


@Component({
    selector: 'app-presentation',
    templateUrl: './presentation.component.html',
    styleUrls: ['./presentation.component.scss'],
    animations: [
        trigger('contact', [
            transition('void => *', [
                style({transform: 'scale3d(.3, .3, .3)'}),
                animate('500ms ease')
            ])
        ])
    ]
})

export class PresentationComponent implements OnInit {
    contactForm = false;
    accounts: Account[];
    images: any[];
    formData: {};
    isDataAvailable: boolean;
    // TODO refactor while implementing whole form
    selectedCompanyEmail: string;
    actionFormModel: ActionFormModel;
    actionUserForm: FormGroup;

    countries = ['County*', 'Richland', 'Greenville', 'Charleston'];
    states = ['State*', 'DC', 'VA'];
    cities = ['City*', 'Columbia', 'Greenville', 'Washington'];

    constructor(private db: AngularFireDatabase,
                private _alert: AlertsService,
                private router: Router,
                private accountService: AccountService,
                private http: HttpClient,
                private uploadService: UploadService,
                private actionFormService: ActionFormService,
                private fb: FormBuilder) {
        this.formData = {
            merge_country: null,
            merge_state: null,
            merge_city: null
        };
    }

    ngOnInit() {
        this.isDataAvailable = false;
        this.actionFormModel = new ActionFormModel();

        this.initSecondStepForm();

        this.accountService.getAccounts().subscribe(accounts => {
            console.log(accounts);
            this.accounts = accounts;
            this.isDataAvailable = true;
            this.images = [];
            for (const account of this.accounts) {
                if (account['image']) {
                    this.uploadService.getAccountImage(account).subscribe(image => {
                        account.data = image;
                    });
                }
            }

        });

        // jQuery time
        let current_fs, next_fs, previous_fs; // fieldsets
        let animating; // flag to prevent quick multi-click glitches

        $('.next').click(function () {
            if (animating) {
                return false;
            }
            animating = true;
            current_fs = $(this).parent().parent();
            next_fs = $(this).parent().parent().next();
            // activate next step on progressbar using the index of next_fs
            $('#progressbar li').eq($('fieldset').index(next_fs)).addClass('active');

            // show the next fieldset
            next_fs.show();
            current_fs.hide();
            animating = false;
        });

        $('.previous').click(function () {
            if (animating) {
                return false;
            }
            animating = true;

            current_fs = $(this).parent().parent();
            previous_fs = $(this).parent().parent().prev();

            // de-activate current step on progressbar
            $('#progressbar li').eq($('fieldset').index(current_fs)).removeClass('active');

            // show the previous fieldset
            previous_fs.show();
            current_fs.hide();
            animating = false;
        });

        $('.submit').click(function () {
            return false;
        })
    }

    initSecondStepForm() {
        this.actionUserForm = this.fb.group({
            type: ['', [Validators.required]],
            price: [null, [Validators.required]],
            loanAmount: [null, [Validators.required]],
            zip: [null, [Validators.required]],
            country: [this.countries[0], [Validators.required]],
            state: [this.states[0], [Validators.required]],
            city: [this.cities[0], [Validators.required]],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required]]
        });
    }

    isControlInvalid(controlName: string): boolean {
        const control = this.actionUserForm.controls[controlName];
        return control.invalid && control.touched;
    }

    setType(type: string) {
        console.log('im here ' + type);
        this.actionUserForm.patchValue({type: type});
    }

    calculateTotals() {
        console.log(this.actionUserForm.value);
        for (const company of this.accounts) {
            company.total_price = this.actionFormService.getTotal(<ActionFormModel>this.actionUserForm.value, company.fees);
            console.log(company.total_price);
        }
    }

    selectCompany(companyEmail: string) {
        this.selectedCompanyEmail = companyEmail;
        this.open();
    }

    open(feature?: boolean) {
        this.contactForm = true;
    }

    close() {
        this.router.navigate(['/landing']);
    }

    sendEmailToClient() {
        const clientEmail = {
            apikey: '9440927c-04d7-4f01-8cdc-698cfc2be1da',
            template: '12010',
            to: this.actionUserForm.get('email').value
        };

        const clientFormData = new FormData();
        Object.keys(clientEmail).forEach(key => {
            clientFormData.append(key, clientEmail[key]);
        });

        return this.http.post('https://api.elasticemail.com/v2/email/send', clientFormData).toPromise()
    }

    sendEmailToAdmin() {
        let companyEmail = {
            apikey: '9440927c-04d7-4f01-8cdc-698cfc2be1da',
            template: '12015',
            to: this.selectedCompanyEmail
        };
        let adminEmailData = {};
        adminEmailData['merge_purchaseprice'] = this.actionUserForm.get('price').value;
        adminEmailData['merge_loanamount'] = this.actionUserForm.get('loanAmount').value;
        adminEmailData['merge_zip'] = this.actionUserForm.get('zip').value;
        adminEmailData['merge_country'] = this.actionUserForm.get('country').value;
        adminEmailData['merge_state'] = this.actionUserForm.get('state').value;
        adminEmailData['merge_city'] = this.actionUserForm.get('city').value;
        adminEmailData['merge_fname'] = this.actionUserForm.get('firstName').value;
        adminEmailData['merge_lname'] = this.actionUserForm.get('lastName').value;
        adminEmailData['merge_useremail'] = this.actionUserForm.get('email').value;
        adminEmailData['merge_userphone'] = this.actionUserForm.get('phone').value;

        const companyFormData = new FormData();
        companyEmail = Object.assign(companyEmail, adminEmailData);
        Object.keys(companyEmail).forEach(key => {
            companyFormData.append(key, companyEmail[key]);
        });
        return this.http.post('https://api.elasticemail.com/v2/email/send', companyFormData).toPromise()
    }

    send() {
        this.sendEmailToClient()
            .then(() => {
                return this.sendEmailToAdmin();
            })
            .then(res => {
                console.log(res);
                this._alert.create('success', 'Your information will be received by the title companies you selected', {
                    overlay: true,
                    overlayClickToClose: true,
                    showCloseButton: true,
                    duration: 5000
                });
                setTimeout(() => this.router.navigate(['/landing']), 1200);
            })
            .catch(err => {
                console.error(err);
            });

        /**
         * TODO should be this way, once subscription plan gets upgraded
         *
         * Push new request no firebae node to trigger cloud functionwhich will send all necessary emails
         */
        // this.db.list('userRequests')
        //     .push({
        //         'userEmail': this.userEmail,
        //         'companyEmail': this.selectedCompanyEmail,
        //         'timestamp': Date.now()
        //     })
        //     .then(() => {
        //         this._alert.create('success', 'Your information will be received by the title companies you selected', {
        //             overlay: true,
        //             overlayClickToClose: true,
        //             showCloseButton: true,
        //             duration: 5000
        //         });
        //         setTimeout(() => this.router.navigate(['/landing']), 1200);
        //     });
    }
}

