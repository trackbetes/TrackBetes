import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the BloodPressureChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blood-pressure-chart',
  templateUrl: 'blood-pressure-chart.html',
})
export class BloodPressureChartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtlr: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BloodPressureChartPage');
  }

  //close the modal 
  closeModal() {
    this.viewCtlr.dismiss(); 
  }


}
