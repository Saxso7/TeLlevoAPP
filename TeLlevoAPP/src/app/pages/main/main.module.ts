import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { ComponentViajeComponent } from '../../components/component-viaje/component-viaje.component';
import { ComponentCotizarComponent } from '../../components/component-cotizar/component-cotizar.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MainPageRoutingModule],
  declarations: [MainPage, ComponentViajeComponent, ComponentCotizarComponent],
})
export class MainPageModule {}
