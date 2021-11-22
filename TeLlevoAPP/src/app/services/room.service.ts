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
}
