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

@Component({
  selector: 'app-costo',
  templateUrl: './costo.page.html',
  styleUrls: ['./costo.page.scss'],
})
export class CostoPage {
  vehP: any;
  tipoVehiculo: any;
  sede: any;
  Comuna: any = ([] = [
    { comuna: 'Valparaiso' },
    { comuna: 'Quillota' },
    { comuna: 'La Cruz' },
    { comuna: 'La Calera' },
    { comuna: 'Viña del Mar' },
    { comuna: 'Quilpue' },
    { comuna: 'Viña Alemana' },
    { comuna: 'Casablanca' },
    { comuna: 'Limache' },
  ]);
  direccion: any;
  users: any;
  viajes: any = [];
  Vehiculo: any = ([] = [
    { Tipo: 'Auto' },
    { Tipo: 'Tanke de la 2nda guerra' },
    { Tipo: 'Camioneta' },
  ]);
  Propia: any = ([] = [{ Tiene: 'Si' }, { Tiene: 'No' }]);
  Sede: any = ([] = [{ Sede: 'Viña del mar' }, { Sede: 'Valparaiso' }]);

  constructor(
    public toastController: ToastController,
    private router: Router,
    private activeroute: ActivatedRoute,
    private menu: MenuController,
    private storage: StorageService,
    private map: MapService
  ) {
    this.router.navigate(['costo/menu']);
  }
  ngOnInit(): void {}
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
  Cargar() {
    this.router.navigate(['main']);
  }
  crearViaje() {}
  async guardarViaje() {
    const obCoords = await Geolocation.getCurrentPosition();
    const lat = obCoords.coords.latitude;
    const long = obCoords.coords.longitude;
    this.storage.saveTravel(
      lat,
      long,
      this.sede,
      this.direccion,
      this.vehP,
      this.tipoVehiculo
    );
  }
}
