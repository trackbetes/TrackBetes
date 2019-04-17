import { PatientDoctorPage } from './../patient-doctor/patient-doctor';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
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
  patientDoctorPage = PatientDoctorPage;
  dashboardPage = DashboardPage;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private menuCtlr: MenuController,
    public toastCtlr: ToastController,
    public loadingCtlr: LoadingController) {

      this.menuCtlr.enable(true, 'sideMenu');
      
      
  }

  

  

}
