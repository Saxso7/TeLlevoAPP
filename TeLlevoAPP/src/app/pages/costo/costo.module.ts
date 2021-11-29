import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CostoPageRoutingModule } from './costo-routing.module';

import { CostoPage } from './costo.page';
import { ConductorComponent } from '../../components/conductor/conductor.component';
import { CrearViajesComponent } from '../../components/crear-viajes/crear-viajes.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CostoPageRoutingModule],
  declarations: [CostoPage, ConductorComponent, CrearViajesComponent],
})
export class CostoPageModule {}
