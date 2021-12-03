import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { Geolocation } from '@capacitor/geolocation';
import { componentFactoryName } from '@angular/compiler';

@Component({
  selector: 'app-component-viaje',
  templateUrl: './component-viaje.component.html',
  styleUrls: ['./component-viaje.component.scss'],
})
export class ComponentViajeComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Viaje: any;
  locationss = [];
  locations = [];
  constructor(private map: MapService) {}
  ngOnInit() {}
  ionViewDidLoad() {}
  presentAlert() {}
  eliminarViaje() {}
}
