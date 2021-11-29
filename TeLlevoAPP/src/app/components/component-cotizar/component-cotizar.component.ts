/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { RoomService } from 'src/app/services/room.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-component-cotizar',
  templateUrl: './component-cotizar.component.html',
  styleUrls: ['./component-cotizar.component.scss'],
})
export class ComponentCotizarComponent implements OnInit {
  locationss = [];
  id: any;
  viajes = [];
  constructor(private storage: StorageService, private room: RoomService) {}

  ngOnInit() {
    this.getViajes();
  }
  ionViewDidLoad() {}
  getViajes() {
    this.room.llamarViajes().subscribe((viaje) => {
      console.log(viaje);
      this.viajes = viaje;
    });
  }
}
