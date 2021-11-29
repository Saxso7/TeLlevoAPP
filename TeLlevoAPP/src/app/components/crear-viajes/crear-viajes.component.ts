import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
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
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Comuna: any = [];
  direccion: null;
  usuario: any;
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
    private activeroute: ActivatedRoute,
    public toastController: ToastController,
    private router: Router,
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.llamarUsuario();
    this.llamarComuna();
    this.llamarSedes();
    this.llamarVePropio();
    this.llamarVeh();
    this.getCurrentPosition();
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
  llamarVeh() {
    this.room.llamarVehiculos().subscribe((tipoV) => {
      console.log(tipoV);
      this.Vehiculo = tipoV;
    });
  }
  async getCurrentPosition() {
    const obCoords = await Geolocation.getCurrentPosition();
    const lat = obCoords.coords.latitude;
    const long = obCoords.coords.longitude;
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
      message: 'Costo generado',
      duration: 2000,
    });
    toast.present();
  }
}
