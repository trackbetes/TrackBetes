import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DoctorPersonalnContactProfilePage } from '../doctor-personaln-contact-profile/doctor-personaln-contact-profile';
import { DoctorInstitutionnSpecialityProfilePage } from '../doctor-institutionn-speciality-profile/doctor-institutionn-speciality-profile';
import { DoctorEducationnExperienceProfilePage } from '../doctor-educationn-experience-profile/doctor-educationn-experience-profile';

/**
 * Generated class for the DoctorProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-profile',
  templateUrl: 'doctor-profile.html',
})
export class DoctorProfilePage {
  modal:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtlr: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorProfilePage');
  }

  openPersnContModal() {
    this.modal = this.modalFunc(DoctorPersonalnContactProfilePage);
    this.modal.present();
  }

  openInstnSpecModal() {
    this.modal = this.modalFunc(DoctorInstitutionnSpecialityProfilePage);
    this.modal.present();
  }

  openEdunExpeModal() {
    this.modal = this.modalFunc(DoctorEducationnExperienceProfilePage);
    this.modal.present();
  }

  modalFunc(page) {
    return this.modalCtlr.create(page);
  }

}

