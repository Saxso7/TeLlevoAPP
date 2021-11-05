/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-component-cotizar',
  templateUrl: './component-cotizar.component.html',
  styleUrls: ['./component-cotizar.component.scss'],
})
export class ComponentCotizarComponent implements OnInit {
  locationss = [];
  constructor(private storage: StorageService) {}

  ngOnInit() {
    this.storage.keys().then((locations) => {
      this.locationss = locations;
      console.log(locations);
    });
  }
  ionViewDidLoad() {}
  eliminar(id) {
    this.storage.removeTravel(id);
  }
}
