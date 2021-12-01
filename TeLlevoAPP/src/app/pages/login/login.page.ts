/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  MenuController,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string;
  public password: string;

  constructor(
    private router: Router,
    public toastController: ToastController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private menu: MenuController,
    private authService: AuthService
  ) {}

  ngOnInit() {}
  loginEmail() {
    this.authService.loginUserEmail(this.email, this.password);
  }
  async presentAlert1() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Te Llevo APP',
      message: '¿Confirmar viaje?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'CONFIRMAR',
          handler: () => {
            this.cargar();
            this.loginEmail();
            console.log('Confirm Okay');
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async cargar() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espere por favor...',
      duration: 1000,
      spinner: 'crescent',
    });
    await loading.present();
  }
  loginConductores() {
    this.router.navigate(['conductor']);
  }
  contrasena() {
    this.router.navigate(['forget']);
  }
  async siguiente() {
    const toast = await this.toastController.create({
      message: 'Ingrese un correo valido',
      duration: 2000,
    });
    toast.present();
  }
  async bienvenido() {
    const toast = await this.toastController.create({
      message: 'Bienvenido ' + this.email,
      duration: 2000,
    });
    toast.present();
  }
}
