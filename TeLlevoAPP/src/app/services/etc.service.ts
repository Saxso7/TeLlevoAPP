import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EtcService {
  httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Access-Control-Allow-Origin': '*',
    }),
  };
  // Se establece la base url del API a consumir
  apiURL = 'http://192.168.1.82:3000';

  constructor(private http: HttpClient) {}

  getComuna(): Observable<any> {
    return this.http.get(this.apiURL + '/comunas/').pipe(retry(3));
  }
  getSede(): Observable<any> {
    return this.http.get(this.apiURL + '/Sede/').pipe(retry(3));
  }
  getPropio(): Observable<any> {
    return this.http.get(this.apiURL + '/Propio/').pipe(retry(3));
  }
  getVehiculo(): Observable<any> {
    return this.http.get(this.apiURL + '/Vehiculo/').pipe(retry(3));
  }
}
