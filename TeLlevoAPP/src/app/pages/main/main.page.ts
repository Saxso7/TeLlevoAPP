/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MenuController,
  ToastController,
  AlertController,
} from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { MapService } from 'src/app/services/map.service';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {
  usuarios: any; //Gereno variable Any(permite todo valor)
  constructor(
    private router: Router,
    private menu: MenuController,
    public toastController: ToastController,
    public alertController: AlertController,
    private map: MapService,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private auth: AuthService
  ) {
    this.router.navigate(['main/viaje']);
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
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.getCurrentPosition();
    this.getUsuario();
  }
  async getCurrentPosition() {
    const obCoords = await Geolocation.getCurrentPosition();
    const lat = obCoords.coords.latitude;
    const long = obCoords.coords.longitude;
    console.log(lat, long);
    this.map.initMap(lat, long, 'map');
  }
  doRefresh() {
    window.location.reload();
  }
  logOut() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
  getUsuario() {
    this.auth.getAuth().subscribe((usuario) => {
      this.usuarios = usuario.email;
    });
  }
}
