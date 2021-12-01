/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, LoadingController } from '@ionic/angular';
import { RoomService } from 'src/app/services/room.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-component-cotizar',
  templateUrl: './component-cotizar.component.html',
  styleUrls: ['./component-cotizar.component.scss'],
})
export class ComponentCotizarComponent implements OnInit {
  fecha: any;
  lat: any;
  long: any;
  latSede: any;
  longSede: any;
  sede: any;
  comuna: any;
  costoTotal: any;
  coleccion: 'Viajes';
  vehiculoP: any;
  viaje: any;
  tiempo: any;
  id: any;
  km: any;
  viajes = [];
  viajes2: any;
  constructor(
    private storage: StorageService,
    private room: RoomService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private db: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.llamarViajes();
  }
  ionViewDidLoad() {}

  llamarViajes() {
    this.room.llamarAll('Viajes').then((viaje) => {
      viaje.subscribe((viajes) => {
        this.viajes = viajes.map((viajeCot) => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const viajes = viajeCot.payload.doc.data();
          // eslint-disable-next-line @typescript-eslint/dot-notation
          viajes['id'] = viajeCot.payload.doc.id;
          return viajes;
        });
      });
    });
  }
  eliminar(id) {
    this.room
      .eliminarAll('Viajes', id)
      .then((res) => {
        console.log('eliminado con exito');
      })
      .catch((err) => {
        console.log('error', err);
      });
  }
  calculateDistance(lon1, lon2, lat1, lat2) {
    // eslint-disable-next-line prefer-const
    let p = 0.017453292519943295;

    // eslint-disable-next-line prefer-const
    let c = Math.cos;

    // eslint-disable-next-line prefer-const
    let a =
      0.5 -
      c((lat1 - lat2) * p) / 2 +
      (c(lat2 * p) * c(lat1 * p) * (1 - c((lon1 - lon2) * p))) / 2;

    // eslint-disable-next-line prefer-const
    let dis = 12742 * Math.asin(Math.sqrt(a));

    return Math.fround(dis);
  }
  crearViajeConfirmado() {
    this.room.crearViajeConfirmado(this.sede, this.costoTotal, this.km);
  }
  costo() {
    const costoG = 1000;
    if (this.viajes2.vehiculoPropio.Tiene === 'Si') {
      this.costoTotal = costoG + 1000;
      console.log('Costo creado', this.costoTotal);
    } else {
      this.costoTotal = costoG;
      console.log(this.costoTotal);
    }
  }
  calcularDistanciaTiempo() {
    this.km = this.calculateDistance(
      this.longSede,
      this.long,
      this.latSede,
      this.lat
    );
    const minutos = this.km / 50;
    this.tiempo = Math.fround(minutos) + ' horas aproximadas';
    console.log(this.tiempo);
    console.log(this.lat, this.latSede, this.km);
  }
  getViaje() {
    this.comuna = this.viajes2.comuna.nombre;
    this.sede = this.viajes2.sede.nombre;
    this.lat = this.viajes2.sede.lat;
    this.latSede = this.viajes2.lat;
    this.long = this.viajes2.long;
    this.longSede = this.viajes2.sede.long;
    this.vehiculoP = this.viajes2.vehiculoPropio.Tiene;
    this.id = this.viajes2.id;
    this.fecha = this.viajes2.fecha.toDate();
    /*this.room.crearViajeConfirmado(this.lat, this.sede, this.km);*/
    this.costo();
    this.calcularDistanciaTiempo();
  }
  async viajeConfirmado() {
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
  async confirmarEliminar() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Te Llevo APP',
      message: '¿Desea eliminar?',
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
            this.eliminar(this.id);
            this.confEliminar();
            this.router.navigate(['costo']);
            console.log('Confirm Okay');
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async confEliminar() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espere por favor...',
      duration: 1000,
      spinner: 'crescent',
    });
    await loading.present();
  }
}
