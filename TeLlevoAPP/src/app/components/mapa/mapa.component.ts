import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  constructor(private map: MapService) {}

  ngOnInit() {}
  async getCurrentPosition() {
    const obCoords = await Geolocation.getCurrentPosition();
    const lat = obCoords.coords.latitude;
    const long = obCoords.coords.longitude;
    console.log(lat, long);
    this.map.initMap(lat, long, 'map');
  }
}
