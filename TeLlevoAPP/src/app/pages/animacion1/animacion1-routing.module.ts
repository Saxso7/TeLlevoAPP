import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Animacion1Page } from './animacion1.page';

const routes: Routes = [
  {
    path: '',
    component: Animacion1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Animacion1PageRoutingModule {}
