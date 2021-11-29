import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainConductorPage } from './main-conductor.page';

const routes: Routes = [
  {
    path: '',
    component: MainConductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainConductorPageRoutingModule {}
