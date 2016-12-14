import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'page-loop',
  templateUrl: 'loop.html',
})
export class LoopPage {

  public uploader:FileUploader = new FileUploader({url: '/loop'});

  constructor(public navCtrl: NavController) {
  }
}
