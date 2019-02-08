import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the MedicalRecordsModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medical-records-modal',
  templateUrl: 'medical-records-modal.html',
})
export class MedicalRecordsModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtlr: ViewController) {
  }

  closeModal() {
    this.viewCtlr.dismiss(); 
  }

}
