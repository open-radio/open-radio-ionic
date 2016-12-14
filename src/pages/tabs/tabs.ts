import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { SequencerPage } from '../sequencer/sequencer';
import { ContactPage } from '../contact/contact';
import { LoopPage } from '../loop/loop';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = LoopPage;
  tab4Root: any = SequencerPage;
  tab5Root: any = ContactPage;

  constructor() {

  }
}
