import { CholesterolChartPage } from './../cholesterol-chart/cholesterol-chart';
import { WeightChartPage } from './../weight-chart/weight-chart';
import { BloodPressureChartPage } from './../blood-pressure-chart/blood-pressure-chart';
import { BloodSugarChartPage } from './../blood-sugar-chart/blood-sugar-chart';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the PatientChartsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-charts',
  templateUrl: 'patient-charts.html',
})
export class PatientChartsPage {

  modal: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtlr: ModalController) {
  }

  ionViewDidLoad() {
    
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

}
