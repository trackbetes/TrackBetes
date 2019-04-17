import { DoctorPatientsPage } from './../doctor-patients/doctor-patients';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { DoctorAppointmentsPage } from '../doctor-appointments/doctor-appointments';
import { DoctorMessagesPage } from '../doctor-messages/doctor-messages';
import { DoctorPrescriptionsPage } from './../doctor-prescriptions/doctor-prescriptions';
import { DoctorDashboardPage } from './../doctor-dashboard/doctor-dashboard';
/**
 * Generated class for the DoctorTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-tabs',
  templateUrl: 'doctor-tabs.html',
})
export class DoctorTabsPage {

  dashboardPage = DoctorDashboardPage;
  doctorPatientsPage = DoctorPatientsPage;
  appointmentsPage = DoctorAppointmentsPage;
  messagesPage = DoctorMessagesPage;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menuCtlr: MenuController) {
      
    this.menuCtlr.enable(true, 'sideMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorTabsPage');
  }

}
