import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the BloodSugarChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blood-sugar-chart',
  templateUrl: 'blood-sugar-chart.html',
})
export class BloodSugarChartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtlr: ViewController) {
  }

  ionViewDidLoad() {
    
  }

  //close the modal 
  closeModal() {
    this.viewCtlr.dismiss(); 
  }

}
