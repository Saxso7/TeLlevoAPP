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
    path: 'splash',
    loadChildren: () =>
      import('./pages/splash/splash.module').then((m) => m.SplashPageModule),
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
