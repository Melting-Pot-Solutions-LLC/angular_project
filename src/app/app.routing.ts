import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './accounts/profile/profile.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { PresentationComponent } from './presentation/presentation.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {EditProfileComponent} from './accounts/edit-profile/edit-profile.component';

const routes: Routes = [
    // { path: 'home',             component: HomeComponent },
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    { path: 'landing',          component: LandingComponent },
    { path: 'user-profile',     component: ProfileComponent , canActivate: [AuthGuardService]},
    { path: 'user-profile/edit',     component: EditProfileComponent , canActivate: [AuthGuardService]},
    { path: 'signup',           component: SignupComponent },
    { path: 'login',            component: LoginComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent },
    { path: 'presentation',     component: PresentationComponent },
    { path: '**', redirectTo: 'landing'}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
