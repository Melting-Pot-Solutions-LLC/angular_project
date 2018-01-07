import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {CropperSettings, ImageCropperComponent} from 'ng2-img-cropper';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-edit-profile-photo',
    templateUrl: './edit-profile-photo.component.html',
    styleUrls: ['./edit-profile-photo.component.scss']
})
export class EditProfilePhotoComponent implements OnInit {
    @Output() data: any;

    cropperSettings: CropperSettings;

    @ViewChild('cropper', undefined)
    cropper: ImageCropperComponent;

    constructor(public activeModal: NgbActiveModal) {
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.width = 150;
        this.cropperSettings.height = 150;
        this.cropperSettings.croppedWidth = 150;
        this.cropperSettings.croppedHeight = 150;
        this.cropperSettings.canvasWidth = 400;
        this.cropperSettings.canvasHeight = 300;
        this.cropperSettings.rounded = true;
        this.data = {};
    }

    ngOnInit() {
    }

    fileChangeListener($event) {
        const image: any = new Image();
        const file: File = $event.target.files[0];
        const myReader: FileReader = new FileReader();
        const that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };

        myReader.readAsDataURL(file);
    }

    onSavePhoto() {
        this.activeModal.close('Close click');
    }
}
