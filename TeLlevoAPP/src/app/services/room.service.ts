/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { AngularFireObject } from '@angular/fire/compat/database';
import { ToastController } from '@ionic/angular';
import { ref, update } from 'firebase/database';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  viaje = 'Viajes';
  eliminar: any = [];
  uid: string;
  constructor(
    private database: AngularFirestore,
    public toastController: ToastController
  ) {}

  // eslint-disable-next-line @typescript-eslint/member-ordering
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DBRef = this.database.collection('Viajes');
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DBCom = this.database.collection('menuViajes');
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DBSed = this.database.collection('Sede');
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DBvehP = this.database.collection('vehPropio');
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DBtipoV = this.database.collection('tipoVehiculo');
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DBcon = this.database.collection('Conductores');
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DBvCon = this.database.collection('ViajeConfirmado');
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DBvRea = this.database.collection('ViajeRealizado');

  llamarViajes() {
    return this.DBRef.snapshotChanges().pipe(
      map((comuna) =>
        comuna.map((viajes) => {
          const via = viajes.payload.doc.data();
          return via;
        })
      )
    );
  }
  async llamarAll(colection) {
    try {
      return await this.database.collection(colection).snapshotChanges();
    } catch (error) {
      console.log('error en:', error);
    }

    /*return this.DBRef.snapshotChanges().pipe(
      map((usuarios) =>
        usuarios.map((usuario) => {
          const data = usuario.payload.doc.data();
          return data;
        })
      )
    );*/
  }
  async eliminarAll(colection, id) {
    try {
      return await this.database.collection(colection).doc(id).delete();
    } catch (error) {
      console.log('error en:', error);
    }
  }
  crearViajes(
    lat: any,
    long: any,
    nombre: string,
    comuna: string,
    sede: string,
    tipoVehiculo: string,
    vehiculoPropio: string,
    fecha: Date
  ) {
    this.DBRef.add({
      lat: lat,
      long: long,
      nombre: nombre,
      comuna: comuna,
      sede: sede,
      tipoVehiculo: tipoVehiculo,
      vehiculoPropio: vehiculoPropio,
      fecha: fecha,
    })
      .then(() => {
        console.log('Viaje  creado  correctamente');
      })
      .catch((err) => console.log(err.message));
  }
  async crearViajeRealizado(
    conductor: any,
    comuna: any,
    usuario: any,
    sede: any,
    km: any,
    fecha: any,
    costo: any,
    tiempo: any
  ) {
    try {
      return await this.DBvRea.add({
        conductor: conductor,
        comuna: comuna,
        usuario: usuario,
        sede: sede,
        km: km,
        fecha: fecha,
        costo: costo,
        tiempo: tiempo,
      });
    } catch (error) {
      console.log('error en ', error);
    }
  }
  crearViajeConfirmado(
    comuna: any,
    usuario: any,
    sede: any,
    km: any,
    fecha: any,
    costo: any,
    tiempo: any
  ) {
    this.DBvCon.add({
      comuna: comuna,
      usuario: usuario,
      sede: sede,
      km: km,
      fecha: fecha,
      costo: costo,
      tiempo: tiempo,
    })
      .then(() => {
        console.log('Viaje  creado  correctamente');
      })
      .catch((err) => console.log(err.message));
  }
  llamarMenuViajes() {
    return this.DBCom.snapshotChanges().pipe(
      map((comuna) =>
        comuna.map((comunas) => {
          const com = comunas.payload.doc.data();
          return com;
        })
      )
    );
  }
  llamarSede() {
    return this.DBSed.snapshotChanges().pipe(
      map((sede) =>
        sede.map((sedes) => {
          const sed = sedes.payload.doc.data();
          return sed;
        })
      )
    );
  }
  llamarvehPropio() {
    return this.DBvehP.snapshotChanges().pipe(
      map((vehP) =>
        vehP.map((vehPropio) => {
          const ve = vehPropio.payload.doc.data();
          return ve;
        })
      )
    );
  }
  llamarVehiculos() {
    return this.DBtipoV.snapshotChanges().pipe(
      map((tipV) =>
        tipV.map((tipoVehi) => {
          const veT = tipoVehi.payload.doc.data();
          return veT;
        })
      )
    );
  }
  llamarConductore() {
    return this.DBcon.snapshotChanges().pipe(
      map((con) =>
        con.map((conductor) => {
          const conductores = conductor.payload.doc.data();
          return conductores;
        })
      )
    );
  }
  eliminarViaje(collection, id) {
    this.database.collection(collection).doc(id).delete();
  }
}
