import { PatientAppointmentsPage } from './../pages/patientPages/patient-appointments/patient-appointments';
import { DoctorsListProfilePage } from './../pages/patientPages/doctors-list-profile/doctors-list-profile';
import { AddPatientAppointmentsPage } from './../pages/patientPages/add-patient-appointments/add-patient-appointments';
import { DoctorPersonalnContactProfilePage } from './../pages/doctor/doctor-personaln-contact-profile/doctor-personaln-contact-profile';
import { BloodSugarChartPage } from './../pages/patientPages/blood-sugar-chart/blood-sugar-chart';
import { PatientChartsPage } from './../pages/patientPages/patient-charts/patient-charts';
import { environment } from './../credentials';
import { PatientDoctorPage } from './../pages/patientPages/patient-doctor/patient-doctor';
import { UserAuthTabsPage } from './../pages/userAuthentication/user-auth-tabs/user-auth-tabs';
import { BloodSugarLevelPage } from './../pages/patientPages/medicalRecordsPages/blood-sugar-level/blood-sugar-level';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController, App } from 'ionic-angular';
//import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';
import { DashboardPage } from '../pages/patientPages/dashboard/dashboard';
import { DoctorTabsPage } from '../pages/doctor/doctor-tabs/doctor-tabs';
import { TabsPage } from '../pages/patientPages/tabs/tabs';
import * as firebase from 'firebase';
import { EditBloodSugarLevelPage } from '../pages/patientPages/medicalRecordsPages/edit-blood-sugar-level/edit-blood-sugar-level';
import { DoctorDashboardPage } from '../pages/doctor/doctor-dashboard/doctor-dashboard';
import { DoctorProfilePage } from '../pages/doctor/doctor-profile/doctor-profile';
import { DoctorInstitutionnSpecialityProfilePage } from '../pages/doctor/doctor-institutionn-speciality-profile/doctor-institutionn-speciality-profile';
import { DoctorsListPage } from '../pages/patientPages/doctors-list/doctors-list';
@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  
  rootPage:any = TabsPage;

  @ViewChild(Nav) nav:Nav;

  constructor(public menuCtrl: MenuController, public app: App, platform: Platform, /*statusBar: StatusBar, splashScreen: SplashScreen*/) {
    
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      /*statusBar.styleDefault();
      splashScreen.hide();*/
    });

  }

  //sign out user
  signOutUser() {
    this.app.getRootNav().setRoot(UserAuthTabsPage);
    this.menuCtrl.close();
  }
}

