import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  MenuController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-animacion2',
  templateUrl: './animacion2.page.html',
  styleUrls: ['./animacion2.page.scss'],
})
export class Animacion2Page implements OnInit {
  constructor(
    private router: Router,
    private menu: MenuController,
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  ngOnInit() {}
  toggleMenu() {
    this.menu.open();
  }
  confirmar() {
    this.presentToast('Viaje realizado. Gracias por preferir TeLlevoApp');
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
    });
    toast.present();
  }
  async presentAlert() {
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
            this.confirmar();
            this.router.navigate(['main-conductor']);
            console.log('Confirm Okay');
          },
        },
      ],
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
