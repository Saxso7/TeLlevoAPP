import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainConductorPageRoutingModule } from './main-conductor-routing.module';

import { MainConductorPage } from './main-conductor.page';
import { ViajeConfirmadoComponent } from '../../components/viaje-confirmado/viaje-confirmado.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainConductorPageRoutingModule,
  ],
  declarations: [MainConductorPage, ViajeConfirmadoComponent],
})
export class MainConductorPageModule {}
