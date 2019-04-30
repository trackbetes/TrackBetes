import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DoctorEducationnExperienceProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-educationn-experience-profile',
  templateUrl: 'doctor-educationn-experience-profile.html',
})
export class DoctorEducationnExperienceProfilePage {

  doctor = {} as Doctor;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   
  }

}
