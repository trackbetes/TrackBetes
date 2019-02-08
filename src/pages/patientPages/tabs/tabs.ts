import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tab1Page } from '../tab1/tab1';
import { Tab2Page } from '../tab2/tab2';
import { Tab3Page } from '../tab3/tab3';
import { DashboardPage } from '../dashboard/dashboard';


   
  
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Page = Tab1Page;
  tab2Page = Tab2Page;
  tab3Page = Tab3Page;
  dashboardPage = DashboardPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
