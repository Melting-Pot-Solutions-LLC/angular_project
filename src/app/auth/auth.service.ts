import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';

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

    // Returns current user UID
    get currentUserId(): string {
        return this.isAuthenticated() ? this.authState.uid : '';
    }

    setAuthState(auth) {
        this.authState = auth;
    }
}
