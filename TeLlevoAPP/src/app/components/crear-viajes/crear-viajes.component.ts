import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MapService } from 'src/app/services/map.service';
import { RoomService } from 'src/app/services/room.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-crear-viajes',
  templateUrl: './crear-viajes.component.html',
  styleUrls: ['./crear-viajes.component.scss'],
})
export class CrearViajesComponent implements OnInit {
  lat: any;
  long: any;
  vehP: any;
  tipoVehiculo: any;
  sede: any;
  direccion: null;
  usuario: any;
  conductor: any;
  latSede: any;
  longSede: any;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Conductores = [];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Comuna: any = [];
  viajes: any = [];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Vehiculo: any = [];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Propia: any = [];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Sede: any = [];

  constructor(
    private map: MapService,
    private room: RoomService,
    private auth: AuthService,
    public toastController: ToastController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.llamarUsuario();
    this.llamarComuna();
    this.llamarSedes();
    this.llamarVePropio();
    this.llamarVeh();
    this.getCurrentPosition();
    this.llamarConductor();
  }
  creadorViajes() {
    if (
      this.direccion == null &&
      this.sede == null &&
      this.tipoVehiculo == null &&
      this.vehP == null
    ) {
      console.log('error');
      this.error();
    } else {
      this.room.crearViajes(
        this.lat,
        this.long,
        this.usuario,
        this.direccion,
        this.sede,
        this.tipoVehiculo,
        this.vehP,
        new Date()
      );
      this.router.navigate(['main']);
      this.siguiente();
    }
  }
  llamarUsuario() {
    this.auth.getAuth().subscribe((usuario) => {
      this.usuario = usuario.email;
      console.log(usuario.email);
    });
  }
  llamarComuna() {
    this.room.llamarMenuViajes().subscribe((comuna) => {
      console.log(comuna);
      this.Comuna = comuna;
    });
  }
  llamarSedes() {
    this.room.llamarSede().subscribe((sede) => {
      console.log(sede);
      this.Sede = sede;
    });
  }
  llamarVePropio() {
    this.room.llamarvehPropio().subscribe((veP) => {
      console.log(veP);
      this.Propia = veP;
    });
  }
  llamarConductor() {
    this.room.llamarConductore().subscribe((con) => {
      console.log(con);
      this.Conductores = con;
    });
  }
  llamarVeh() {
    this.room.llamarVehiculos().subscribe((tipoV) => {
      console.log(tipoV);
      this.Vehiculo = tipoV;
    });
  }
  async getCurrentPosition() {
    const obCoords = await Geolocation.getCurrentPosition();
    const lat = -32.991505;
    const long = -71.504616;
    this.lat = lat;
    this.long = long;
    console.log(lat, long);
  }
  async error() {
    const toast = await this.toastController.create({
      message: 'Debes rellenar todos los campos',
      duration: 2000,
    });
    toast.present();
  }
  async siguiente() {
    const toast = await this.toastController.create({
      message: 'Viaje cotizado',
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
            this.creadorViajes();
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
