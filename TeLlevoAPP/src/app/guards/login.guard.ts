import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate() {
    // eslint-disable-next-line prefer-const
    let usertAuth = this.authService.isAuthenticated();
    if (usertAuth) {
      console.log('Autenticar');
      return true;
    } else {
      console.log('No entro papa');
      return false;
    }
  }
}
