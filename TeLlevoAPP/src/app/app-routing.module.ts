import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes,
  CanActivate,
} from '@angular/router';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'forget',
    loadChildren: () =>
      import('./pages/forget/forget.module').then((m) => m.ForgetPageModule),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/main/main.module').then((m) => m.MainPageModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'splash2',
    loadChildren: () =>
      import('./pages/splash2/splash2.module').then((m) => m.Splash2PageModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'costo',
    loadChildren: () =>
      import('./pages/costo/costo.module').then((m) => m.CostoPageModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'conductor',
    loadChildren: () =>
      import('./pages/login-conductor/login-conductor.module').then(
        (m) => m.LoginConductorPageModule
      ),
  },
  {
    path: 'main-conductor',
    loadChildren: () =>
      import('./pages/main-conductor/main-conductor.module').then(
        (m) => m.MainConductorPageModule
      ),
    canActivate: [LoginGuard],
  },
  {
    path: 'animacion1',
    loadChildren: () =>
      import('./pages/animacion1/animacion1.module').then(
        (m) => m.Animacion1PageModule
      ),
    canActivate: [LoginGuard],
  },
  {
    path: 'animacion2',
    loadChildren: () =>
      import('./pages/animacion2/animacion2.module').then(
        (m) => m.Animacion2PageModule
      ),
    canActivate: [LoginGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
