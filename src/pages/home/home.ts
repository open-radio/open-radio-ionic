import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Sequencer } from '../../assets/ts/daw/Sequencer.ts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
}
