import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CostoPage } from './costo.page';
import { IonicModule } from '@ionic/angular';
import { ComponentMenuComponent } from '../../components/component-menu/component-menu.component';
import { ConductorComponent } from '../../components/conductor/conductor.component';
import { CrearViajesComponent } from '../../components/crear-viajes/crear-viajes.component';

const routes: Routes = [
  {
    path: '',
    component: CostoPage,
    //Declaro rutas hijas
    children: [
      {
        path: 'conductor',
        component: ConductorComponent,
      },
      {
        path: 'crear',
        component: CrearViajesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), IonicModule],
  exports: [RouterModule],
})
export class CostoPageRoutingModule {}
