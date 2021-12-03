import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MapService } from 'src/app/services/map.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-conductor',
  templateUrl: './main-conductor.page.html',
  styleUrls: ['./main-conductor.page.scss'],
})
export class MainConductorPage implements OnInit {
  usuarios: string;
  constructor(
    private router: Router,
    private map: MapService,
    private auth: AuthService
  ) {
    this.router.navigate(['main-conductor/viaje']);
  }

  ngOnInit() {
    this.getUsuario();
  }

  segmentChanged($event) {
    console.log($event);
    // eslint-disable-next-line prefer-const
    let direccion = $event.detail.value;
    this.router.navigate(['main-conductor/' + direccion]);
  }
  logOut() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
  getUsuario() {
    this.auth.getAuth().subscribe((usuario) => {
      this.usuarios = usuario.email;
    });
  }
}
