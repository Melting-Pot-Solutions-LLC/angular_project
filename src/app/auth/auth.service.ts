/*******************************************
** Author            : Melting Pot Solutions LLC
** Last modified     : 09/05/2018
**
********************************************/


import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {AbstractControl} from '@angular/forms';

@Injectable()
export class AuthService {
    authState: any = null;

    constructor(private afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe((auth) => {
            this.authState = auth
        });
    }

    login(email: string, password: string): Observable<any> {
        const promise = this.afAuth.auth.signInWithEmailAndPassword(email, password);
        return Observable.fromPromise(promise);
    }

    signUp(email: string, password: string): Observable<any> {
        const promise = this.afAuth.auth.createUserWithEmailAndPassword(email, password);
        return Observable.fromPromise(promise);
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuthenticated() {
        return this.authState !== null;
    }

    sendEmailVerification() {
        this.afAuth.auth.currentUser.sendEmailVerification();
    }

    resetPassword(email: string) {
        const promise = this.afAuth.auth.sendPasswordResetEmail(email);
        return Observable.fromPromise(promise);
    }

    // Returns current user UID
    get currentUserId(): string {
        return this.isAuthenticated() ? this.authState.uid : '';
    }

    setAuthState(auth) {
        this.authState = auth;
    }



    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('password').value; // to get value in input tag
        let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
         if(password != confirmPassword) {
             console.log('false');
             AC.get('confirmPassword').setErrors( {MatchPassword: true} )
         } else {
             console.log('true');
             return null
         }
     }
}
