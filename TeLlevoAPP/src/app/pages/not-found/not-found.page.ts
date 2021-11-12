import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage implements OnInit {
  //Declara el elemento que esta en el DOM y que deseo animar
  @ViewChild('animar', { read: ElementRef, static: true }) animar: ElementRef;
  constructor(private animationCtrl: AnimationController) {}

  ngOnInit() {}
}
