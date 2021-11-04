/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegionesService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  apiHomeURL = 'http://192.168.1.82:3000';

  constructor(private http: HttpClient) {}

  getViajes() {
    return this.http.get(this.apiHomeURL);
  }
  getPost(): Observable<any> {
    return this.http.get(this.apiHomeURL + '/Viajes/').pipe(retry(3));
  }

  getComuna(): Observable<any> {
    return this.http.get(this.apiHomeURL + '/comunas/').pipe(retry(3));
  }
  getViaje(): Observable<any> {
    return this.http.get(this.apiHomeURL + '/Viajes/').pipe(retry(3));
  }
  getUsuario(): Observable<any> {
    return this.http.get(this.apiHomeURL + '/Users/').pipe(retry(3));
  }
  createViaje(post): Observable<any> {
    return this.http
      .post(this.apiHomeURL + '/Viajes', post, this.httpOptions)
      .pipe(retry(3));
  }
}
