import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  locations = [];
  constructor() {}
  saveTravel = async (
    lat: number,
    lng: number,
    sede: string,
    comuna: string,
    vePropio: string,
    tiVeh: string
  ) => {
    const id = new Date().getTime();
    await Storage.set({
      key: `location/${id}`,
      value: JSON.stringify({
        id,
        lat,
        lng,
        sede,
        comuna,
        vePropio,
        tiVeh,
      }),
    });
  };
  async keys() {
    const keys = await Storage.keys();
    console.log('Ta bien:', keys);
    //llamamos a get item y les pasamos los parametros de las keys
    return this.getItem(keys.keys);
  }
  async getItem(keys) {
    for (const key of keys) {
      const itemLS = await Storage.get({ key });
      const item = JSON.parse(itemLS.value);
      //asignamos el objeto al arreglo location
      this.locations.push(item);
    }
    return this.locations;
  }
  async removeTravel(id) {
    await Storage.remove({ key: `location/${id}` });
    window.location.reload();
  }
}
