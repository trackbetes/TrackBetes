import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WeightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weight',
  templateUrl: 'weight.html',
})
export class WeightPage {

  weightValue:number;
  comments:string;

  //current date and time constants
  currentDate: string = new Date().toISOString();
  currentTime: string = new Date().toISOString();

  //Datetime Picker
  public dateTime = {
    date: this.currentDate,
    time: this.currentTime,
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  saveRecord() {
    let record = {
      name:'Weight',
      value:this.weightValue,
      date:this.dateTime.date,
      time:this.dateTime.time,
      comments:this.comments,
    }

    console.log(record);
  }

}
