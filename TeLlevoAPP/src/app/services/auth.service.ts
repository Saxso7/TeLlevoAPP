import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: any;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  constructor(private Auth: AngularFireAuth, private router: Router) {}
  loginUserEmail(email: string, password: string) {
    this.Auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user.user.email);
        this.router.navigate(['/main']);
      })
      .catch((err) => console.log(err.message));
  }
  isAuthenticated() {
    return this.Auth.currentUser !== null;
  }
  logout(): Promise<any> {
    return this.Auth.signOut();
  }
  getAuth() {
    return this.Auth.authState;
  }
}
