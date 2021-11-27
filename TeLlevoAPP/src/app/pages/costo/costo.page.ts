/* eslint-disable no-var */
/* eslint-disable eqeqeq */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { MapService } from '../../services/map.service';
import { Geolocation } from '@capacitor/geolocation';
import { Storage } from '@capacitor/storage';
import { EtcService } from '../../services/etc.service';
import { RoomService } from 'src/app/services/room.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-costo',
  templateUrl: './costo.page.html',
  styleUrls: ['./costo.page.scss'],
})
export class CostoPage {
  vehP: any;
  tipoVehiculo: any;
  sede: any;
  Comuna: any = [];
  direccion: any;
  usuario: any;
  viajes: any = [];
  Vehiculo: any = [];
  Propia: any = [];
  Sede: any = [];

  constructor(
    public toastController: ToastController,
    private router: Router,
    private activeroute: ActivatedRoute,
    private menu: MenuController,
    private storage: StorageService,
    private map: MapService,
    private api: EtcService,
    private room: RoomService,
    private auth: AuthService
  ) {
    this.router.navigate(['costo/menu']);
  }
  ngOnInit(): void {
    this.llamarUsuario();
    this.llamarComuna();
    this.llamarSedes();
    this.llamarVePropio();
    this.llamarVeh();
  }
  confirmar() {
    let navigationExtras: NavigationExtras = {
      state: { Direccion: this.direccion },
    };
  }

  async siguiente() {
    const toast = await this.toastController.create({
      message: 'Costo generado',
      duration: 2000,
    });
    toast.present();
  }
  toggleMenu() {
    this.menu.open();
  }
  creadorViajes() {
    if (this.direccion !== null && this.sede !== null) {
      this.room.crearViajes(
        this.usuario,
        this.direccion,
        this.sede,
        this.tipoVehiculo,
        this.vehP
      );
      this.router.navigate(['main']);
      this.siguiente();
    } else {
      console.log('error');
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
}
