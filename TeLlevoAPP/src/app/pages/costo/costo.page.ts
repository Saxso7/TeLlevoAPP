/* eslint-disable no-var */
/* eslint-disable eqeqeq */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-costo',
  templateUrl: './costo.page.html',
  styleUrls: ['./costo.page.scss'],
})
export class CostoPage {
  usuario: any;
  constructor(
    public toastController: ToastController,
    private router: Router,
    private menu: MenuController,
    private auth: AuthService
  ) {
    this.router.navigate(['costo/crear']);
  }
  ngOnInit(): void {
    this.llamarUsuario();
  }
  toggleMenu() {
    this.menu.open();
  }

  segmentChanged($event) {
    console.log($event);
    let direccion = $event.detail.value;
    this.router.navigate(['costo/' + direccion]);
  }
  logOut() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
  llamarUsuario() {
    this.auth.getAuth().subscribe((usuario) => {
      this.usuario = usuario.email;
      console.log(usuario.email);
    });
  }
  main() {
    this.router.navigate(['main']);
  }
}
