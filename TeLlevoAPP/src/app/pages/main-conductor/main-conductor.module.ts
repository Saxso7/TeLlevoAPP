import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainConductorPageRoutingModule } from './main-conductor-routing.module';

import { MainConductorPage } from './main-conductor.page';
import { MapaComponent } from '../../components/mapa/mapa.component';
import { CrearViajesComponent } from '../../components/crear-viajes/crear-viajes.component';
import { ViajeConfirmadoComponent } from '../../components/viaje-confirmado/viaje-confirmado.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainConductorPageRoutingModule,
  ],
  declarations: [MainConductorPage, MapaComponent, ViajeConfirmadoComponent],
})
export class MainConductorPageModule {}
