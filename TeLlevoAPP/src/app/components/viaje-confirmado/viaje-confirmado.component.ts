/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { map } from 'rxjs/operators';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viaje-confirmado',
  templateUrl: './viaje-confirmado.component.html',
  styleUrls: ['./viaje-confirmado.component.scss'],
})
export class ViajeConfirmadoComponent implements OnInit {
  viajesConfirmados = [];
  viajesConfirmado: any;
  sede: any;
  comuna: any;
  costoTotal: any;
  fecha: any;
  tiempo: any;
  usuario: any;
  distancia: any;
  conductor: any;
  id: any;
  constructor(
    private room: RoomService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private auth: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getUsuario();
    return this.room.llamarAll('ViajeConfirmado').then((viaC) => {
      viaC.subscribe((viaCon) => {
        this.viajesConfirmados = viaCon.map((viajeC) => {
          const viajeConfirmado = viajeC.payload.doc.data();
          viajeConfirmado['id'] = viajeC.payload.doc.id;
          return viajeConfirmado;
        });
      });
    });
  }
  guardarViajeRealizado() {
    this.room.crearViajeRealizado(
      this.conductor,
      this.comuna,
      this.usuario,
      this.sede,
      this.distancia,
      this.fecha,
      this.costoTotal,
      this.tiempo
    );
  }
  getViajeConfirmado() {
    this.usuario = this.viajesConfirmado.usuario;
    this.comuna = this.viajesConfirmado.comuna;
    this.sede = this.viajesConfirmado.sede;
    this.costoTotal = this.viajesConfirmado.costo;
    this.fecha = this.viajesConfirmado.fecha.toDate();
    this.tiempo = this.viajesConfirmado.tiempo;
    this.distancia = this.viajesConfirmado.km;
    this.id = this.viajesConfirmado.id;
  }
  eliminar(id) {
    this.room
      .eliminarAll('ViajeConfirmado', id)
      .then((res) => {
        console.log('eliminado con exito');
      })
      .catch((err) => {
        console.log('error', err);
      });
  }
  async viajeRealizar() {
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
            this.guardarViajeRealizado();
            this.cargar();
            this.eliminar(this.id);
            this.router.navigate(['animacion2']);
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
  getUsuario() {
    this.auth.getAuth().subscribe((usuario) => {
      this.conductor = usuario.email;
    });
  }
}
