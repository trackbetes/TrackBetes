import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { BloodSugarChartPage } from '../patientPages/blood-sugar-chart/blood-sugar-chart';
import { BloodPressureChartPage } from '../patientPages/blood-pressure-chart/blood-pressure-chart';
import { WeightChartPage } from '../patientPages/weight-chart/weight-chart';
import { CholesterolChartPage } from '../patientPages/cholesterol-chart/cholesterol-chart';

/**
 * Generated class for the DoctorPatientChartsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-patient-charts',
  templateUrl: 'doctor-patient-charts.html',
})
export class DoctorPatientChartsPage {

  modal: any;


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private viewCtlr: ViewController,
     public modalCtlr: ModalController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorPatientChartsPage');
  }

  showBloodSugarChart() {
    this.modal = this.modalFunc(BloodSugarChartPage);
    this.modal.present();

  }

  showBloodPressureChart() {
    this.modal = this.modalFunc(BloodPressureChartPage)
    this.modal.present();
  }

  showWeightChart() {
    this.modal = this.modalFunc(WeightChartPage)
    this.modal.present();
  }

  showCholesterolChart() {
    this.modal = this.modalFunc(CholesterolChartPage)
    this.modal.present(); 
  }

  modalFunc(page) {
    return this.modalCtlr.create(page);
  }

  //close the modal 
  closeModal() {
    this.viewCtlr.dismiss(); 
  }

}
