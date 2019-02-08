import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { BloodSugarLevelPage } from '../medicalRecordsPages/blood-sugar-level/blood-sugar-level';
import { InsulinPage } from '../medicalRecordsPages/insulin/insulin';
import { WeightPage } from '../medicalRecordsPages/weight/weight';
import { BloodPressurePage } from '../medicalRecordsPages/blood-pressure/blood-pressure';
import { CholesterolPage } from '../medicalRecordsPages/cholesterol/cholesterol';
import { KetonesPage } from '../medicalRecordsPages/ketones/ketones';
import { Tab1Page } from '../tab1/tab1';

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

  any() {
    this.navCtrl.push(Tab1Page);
  }

  addBloodSugarLevel(){
    this.navCtrl.push(BloodSugarLevelPage);
  }

  addInsulin(){
    this.navCtrl.push(InsulinPage);
  }

  addWeight(){
    this.navCtrl.push(WeightPage);
  }

  addBloodPressure(){
    this.navCtrl.push(BloodPressurePage);
  }

  addCholesterol(){
    this.navCtrl.push(CholesterolPage);
  }

  addKetones(){
    this.navCtrl.push(KetonesPage);
  }

  addHA1C(){
    //this.navCtrl.push()
  }

  //close the modal 
  closeModal() {
    this.viewCtlr.dismiss(); 
  }

}
