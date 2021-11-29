/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {
  public email = '';
  user: string;
  constructor(
    private router: Router,
    public toastController: ToastController,
    private menu: MenuController,
    private auth: AuthService
  ) {}
  ngOnInit() {
    this.menu.enable(false);
  }

  dato: any = {
    user: '',
  };

  login() {
    // eslint-disable-next-line eqeqeq
    if (this.dato.user !== '') {
      this.presentToast('Se envio un correo a ' + this.dato.user);
      this.router.navigate(['/login']);
    } else {
      this.presentToast('Debe ingresar un usuario valido');
    }
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000,
    });
    toast.present();
  }
  inicio() {
    this.router.navigate(['login']);
  }
  resetPass() {
    this.auth
      .resetPass(this.email)
      .then(() => {
        console.log('enviado');
      })
      .catch(() => {
        console.log('error');
      });
  }
}
