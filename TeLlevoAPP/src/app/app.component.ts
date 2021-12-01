import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { RoomService } from './services/room.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    public router: Router,
    private room: RoomService,
    private auth: AuthService // eslint-disable-next-line @typescript-eslint/naming-convention
  ) {}

  initializeApp() {
    this.platform.ready().then(() => {
      this.router.navigateByUrl('splash');
    });
  }
}
