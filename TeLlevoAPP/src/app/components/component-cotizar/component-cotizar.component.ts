import { Component, OnInit } from '@angular/core';
import { RegionesService } from '../../services/regiones.service';

@Component({
  selector: 'app-component-cotizar',
  templateUrl: './component-cotizar.component.html',
  styleUrls: ['./component-cotizar.component.scss'],
})
export class ComponentCotizarComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Viaje: any;

  constructor(private api: RegionesService) {}

  ngOnInit() {
    this.getViajes();
  }
  ionViewDidLoad() {
    this.getViajes();
  }
  getViajes() {
    this.api.getPost().subscribe((viaje) => {
      console.log(viaje);
      this.Viaje = viaje;
    });
  }
}
