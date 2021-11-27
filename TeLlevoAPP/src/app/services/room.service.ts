/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { AngularFireObject } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  eliminarViajes: AngularFireObject<any>;
  constructor(private database: AngularFirestore) {}

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

  llamarViajes() {
    return this.DBRef.snapshotChanges().pipe(
      map((usuarios) =>
        usuarios.map((usuario) => {
          const data = usuario.payload.doc.data();
          return data;
        })
      )
    );
  }
  crearViajes(
    nombre: string,
    comuna: string,
    sede: string,
    tipoVehiculo: string,
    vehiculoPropio: string
  ) {
    this.DBRef.add({
      nombre: nombre,
      comuna: comuna,
      sede: sede,
      tipoVehiculo: tipoVehiculo,
      vehiculoPropio: vehiculoPropio,
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
}
