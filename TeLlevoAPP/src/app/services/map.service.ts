import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

declare let google;

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor() {}

  async initMap(lat: number, lng: number, id: string) {
    const map = await new google.maps.Map(document.getElementById(id), {
      center: {
        lat,
        lng,
      },
      zoom: 12,
    });
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map,
    });
  }
  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
  };
}
