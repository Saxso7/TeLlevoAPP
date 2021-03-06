import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainConductorPage } from './main-conductor.page';

import { ViajeConfirmadoComponent } from '../../components/viaje-confirmado/viaje-confirmado.component';

const routes: Routes = [
  {
    path: '',
    component: MainConductorPage,
    children: [
      {
        path: 'viaje',
        component: ViajeConfirmadoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainConductorPageRoutingModule {}
