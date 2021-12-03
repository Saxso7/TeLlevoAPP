import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Animacion2PageRoutingModule } from './animacion2-routing.module';

import { Animacion2Page } from './animacion2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Animacion2PageRoutingModule
  ],
  declarations: [Animacion2Page]
})
export class Animacion2PageModule {}
