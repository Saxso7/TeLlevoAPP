/* eslint-disable no-var */
/* eslint-disable eqeqeq */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { RegionesService } from 'src/app/services/regiones.service';

@Component({
  selector: 'app-costo',
  templateUrl: './costo.page.html',
  styleUrls: ['./costo.page.scss'],
})
export class CostoPage {
  vehP: any;
  Costo: any;
  tipoVehiculo: any;
  sede: any;
  Comuna: any = [];
  direccion: any;
  users: any;
  viajes: any = [];
  Viaje: any = {
    Direccion: '',
    Sede: '',
    VePropio: '',
    VeTipo: '',
    id: null,
  };
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
    private regionService: RegionesService
  ) {
    this.router.navigate(['costo/menu']);
  }
  ngOnInit(): void {
    this.getViajes();
    this.llamarComuna();
  }
  llamarComuna() {
    this.regionService.getComuna().subscribe((comuna) => {
      console.log(comuna);
      this.Comuna = comuna;
    });
  }
  confirmar() {
    let navigationExtras: NavigationExtras = {
      state: { Direccion: this.direccion },
    };
  }
  getViajes() {
    this.regionService.getViaje().subscribe((viaje) => {
      console.log(viaje);
      this.viajes = viaje;
    });
  }
  async siguiente() {
    const toast = await this.toastController.create({
      message: 'El precio de su viaje es de $xxxxx' + this.Costo,
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
  crearViaje() {
    var post = {
      Direccion: this.direccion,
      Sede: this.sede,
      VePropio: this.vehP,
      VeTipo: this.tipoVehiculo,
      id: null,
    };
    this.regionService.createViaje(post).subscribe(
      (success) => {
        console.log(success);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  costo() {
    if (this.Viaje.VePropio[0] == this.vehP) {
      this.Costo = 1000;
      console.log(this.Costo);
    } else {
      this.Costo = 0;
      console.log(this.Costo);
    }
  }
}
