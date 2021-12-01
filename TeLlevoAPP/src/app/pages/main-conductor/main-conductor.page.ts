import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-main-conductor',
  templateUrl: './main-conductor.page.html',
  styleUrls: ['./main-conductor.page.scss'],
})
export class MainConductorPage implements OnInit {
  constructor(private router: Router, private map: MapService) {
    this.router.navigate(['main-conductor/mapa']);
  }

  ngOnInit() {}

  segmentChanged($event) {
    console.log($event);
    // eslint-disable-next-line prefer-const
    let direccion = $event.detail.value;
    this.router.navigate(['main-conductor/' + direccion]);
  }
}
