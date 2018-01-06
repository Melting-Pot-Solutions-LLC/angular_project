import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbModal, NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { JasperoAlertsModule } from '@jaspero/ng2-alerts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing';


import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './accounts/profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PresentationComponent } from './presentation/presentation.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './auth/login/login.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthService} from './auth/auth.service';
import {AuthGuardService} from './auth/auth-guard.service';
import { EditProfileComponent } from './accounts/edit-profile/edit-profile.component';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AccountService} from './accounts/account.service';
import {ImageCropperComponent} from 'ng2-img-cropper';
import { EditProfilePhotoComponent } from './accounts/edit-profile/edit-profile-photo/edit-profile-photo.component';
import {UploadService} from './accounts/upload.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
      PresentationComponent,
      LoginComponent,
      EditProfileComponent,
      ImageCropperComponent,
      EditProfilePhotoComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    JasperoAlertsModule,
    BrowserAnimationsModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      AngularFireDatabaseModule,
      NgbModalModule
  ],
  providers: [AuthService, AuthGuardService, AccountService, UploadService],
  bootstrap: [AppComponent],
    entryComponents: [EditProfilePhotoComponent]
})
export class AppModule { }
