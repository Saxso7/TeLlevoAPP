import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
  logout() {
    this.Auth.signOut()
      .then(() => {
        console.log('Esperamos verte pronto');
      })
      .catch((err) => console.log(err.message));
  }
}