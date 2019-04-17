import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the WeightChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weight-chart',
  templateUrl: 'weight-chart.html',
})
export class WeightChartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtlr: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeightChartPage');
  }


  //close the modal 
  closeModal() {
    this.viewCtlr.dismiss(); 
  }
}
