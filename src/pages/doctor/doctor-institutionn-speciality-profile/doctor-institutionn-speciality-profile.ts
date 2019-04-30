import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the DoctorInstitutionnSpecialityProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-institutionn-speciality-profile',
  templateUrl: 'doctor-institutionn-speciality-profile.html',
})
export class DoctorInstitutionnSpecialityProfilePage {

  doctor = {} as Doctor

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtlr: ViewController) {

  }

  ionViewDidLoad() {
    
  }

  saveProfile() {
    this.navCtrl.pop();
  }

  closeModal() {
    this.viewCtlr.dismiss();
  }

}
