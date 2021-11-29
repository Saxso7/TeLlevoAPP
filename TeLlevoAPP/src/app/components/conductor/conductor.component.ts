import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.scss'],
})
export class ConductorComponent implements OnInit {
  conductores = [];
  conductor: any;
  nombre: any;
  rut: any;
  edad: any;
  vehiculo: any;
  patente: any;
  licencia: any;
  constructor(private room: RoomService) {}

  ngOnInit() {
    this.llamarConductor();
  }
  llamarConductor() {
    this.room.llamarConductore().subscribe((con) => {
      this.conductores = con;
      console.log(this.conductores);
    });
  }
  getConductor() {
    console.log(this.conductor);
    this.nombre = this.conductor.Nombre;
    this.rut = this.conductor.Rut;
    this.edad = this.conductor.Edad;
    this.vehiculo = this.conductor.Vehiculo;
    this.patente = this.conductor.Patente;
    this.licencia = this.conductor.Licencia;
  }
}
