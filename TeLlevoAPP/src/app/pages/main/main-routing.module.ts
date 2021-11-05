import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import { ComponentViajeComponent } from '../../components/component-viaje/component-viaje.component';
import { ComponentCotizarComponent } from '../../components/component-cotizar/component-cotizar.component';
import { ComponentMenuComponent } from '../../components/component-menu/component-menu.component';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'viaje',
        component: ComponentViajeComponent,
      },
      {
        path: 'cotizar',
        component: ComponentCotizarComponent,
      },
      {
        path: 'menu',
        component: ComponentMenuComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
