import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MedicalRecordsModalPage } from '../medical-records-modal/medical-records-modal';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtlr: ModalController) {
    
  }

  medicalRecordsModal() {

    const modal = this.modalCtlr.create(MedicalRecordsModalPage);
    modal.present();

  }
  

}
