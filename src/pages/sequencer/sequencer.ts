import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Sequencer } from '../../assets/ts/daw/Sequencer';

@Component({
  selector: 'page-sequencer',
  templateUrl: 'sequencer.html'
})

export class SequencerPage {

  constructor(public navCtrl: NavController) {
  }
  ionViewWillEnter(){
    const sequencer = new Sequencer();
    sequencer.load();
  }
}
