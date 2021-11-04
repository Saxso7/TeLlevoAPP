/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MenuController,
  ToastController,
  AlertController,
} from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {
  dato: any; //Gereno variable Any(permite todo valor)
  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private menu: MenuController,
    public toastController: ToastController,
    public alertController: AlertController
  ) {
    this.router.navigate(['main/viaje']);
    this.activeroute.queryParams.subscribe((params) => {
      //utilizamos lamdba
      if (this.router.getCurrentNavigation().extras.state) {
        this.dato = this.router.getCurrentNavigation().extras.state.dato;
        console.log(this.dato);
      }
    });
  }
  toggleMenu() {
    this.menu.open();
  }
  confirmar() {
    this.presentToast(
      'Viaje confirmado, tiempo aproximado llegada del vehiculo XXXXX'
    );
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
            console.log('Confirm Okay');
          },
        },
      ],
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  costo() {
    this.router.navigate(['/splash2']);
  }
  segmentChanged($event) {
    console.log($event);
    let direccion = $event.detail.value;
    this.router.navigate(['main/' + direccion]);
  }
}
