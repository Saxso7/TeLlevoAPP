import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-conductor',
  templateUrl: './login-conductor.page.html',
  styleUrls: ['./login-conductor.page.scss'],
})
export class LoginConductorPage implements OnInit {
  public email: string;
  public password: string;
  constructor(
    private router: Router,
    private authService: AuthService,
    public toastController: ToastController
  ) {}

  ngOnInit() {}
  loginEmail() {
    if (this.email == null) {
      this.siguiente();
      console.log('error');
    } else {
      console.log(this.email);
      this.authService.loginUserEmailConductor(this.email, this.password);
    }
  }
  iniciarSesion() {
    this.router.navigate(['main-conductor']);
  }
  inicio() {
    this.router.navigate(['login']);
  }
  async siguiente() {
    const toast = await this.toastController.create({
      message: 'Ingrese un correo valido',
      duration: 2000,
    });
    toast.present();
  }
}
