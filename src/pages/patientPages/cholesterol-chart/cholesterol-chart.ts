import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CholesterolChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cholesterol-chart',
  templateUrl: 'cholesterol-chart.html',
})
export class CholesterolChartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtlr: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CholesterolChartPage');
  }

  //close the modal 
  closeModal() {
    this.viewCtlr.dismiss(); 
  }

}
