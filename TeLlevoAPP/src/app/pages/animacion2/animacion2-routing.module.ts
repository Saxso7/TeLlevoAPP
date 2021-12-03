import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Animacion2Page } from './animacion2.page';

const routes: Routes = [
  {
    path: '',
    component: Animacion2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Animacion2PageRoutingModule {}
