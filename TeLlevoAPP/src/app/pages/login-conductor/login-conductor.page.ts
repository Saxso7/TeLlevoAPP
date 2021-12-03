import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
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
    public toastController: ToastController,
    public alertController: AlertController,
    public loadingController: LoadingController
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
}
