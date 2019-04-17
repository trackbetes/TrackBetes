import { CholesterolChartPage } from './../pages/patientPages/cholesterol-chart/cholesterol-chart';
import { WeightChartPage } from './../pages/patientPages/weight-chart/weight-chart';
import { BloodPressureChartPage } from './../pages/patientPages/blood-pressure-chart/blood-pressure-chart';
import { BloodSugarChartPage } from './../pages/patientPages/blood-sugar-chart/blood-sugar-chart';
import { PatientChartsPage } from './../pages/patientPages/patient-charts/patient-charts';
import { AddPatientAppointmentsPage } from '../pages/patientPages/add-patient-appointments/add-patient-appointments';
import { PatientAppointmentsPage } from './../pages/patientPages/patient-appointments/patient-appointments';
import { PatientDoctorPage } from './../pages/patientPages/patient-doctor/patient-doctor';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
//import { SplashScreen } from '@ionic-native/splash-screen';
//import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';

//User Authentication Pages
import { SignInPage } from '../pages/userAuthentication/sign-in/sign-in';
import { SignUpPage } from '../pages/userAuthentication/sign-up/sign-up';
import { UserAuthTabsPage } from '../pages/userAuthentication/user-auth-tabs/user-auth-tabs';

//Patient Pages
import { TabsPage } from '../pages/patientPages/tabs/tabs';
import { DashboardPage } from '../pages/patientPages/dashboard/dashboard';
import { MedicalRecordsModalPage } from '../pages/patientPages/medical-records-modal/medical-records-modal';
import { Tab1Page } from '../pages/patientPages/tab1/tab1';
import { Tab2Page } from '../pages/patientPages/tab2/tab2';
import { Tab3Page } from '../pages/patientPages/tab3/tab3';
import { BloodPressurePage } from '../pages/patientPages/medicalRecordsPages/blood-pressure/blood-pressure';
import { BloodSugarLevelPage } from '../pages/patientPages/medicalRecordsPages/blood-sugar-level/blood-sugar-level';
import { CholesterolPage } from '../pages/patientPages/medicalRecordsPages/cholesterol/cholesterol';
import { InsulinPage } from '../pages/patientPages/medicalRecordsPages/insulin/insulin';
import { KetonesPage } from '../pages/patientPages/medicalRecordsPages/ketones/ketones';
import { WeightPage } from '../pages/patientPages/medicalRecordsPages/weight/weight';

//Doctor Pages
import { DoctorTabsPage } from './../pages/doctor/doctor-tabs/doctor-tabs';
import { DoctorMessagesPage } from './../pages/doctor/doctor-messages/doctor-messages';
import { DoctorAppointmentsPage } from './../pages/doctor/doctor-appointments/doctor-appointments';
import { DoctorPrescriptionsPage } from './../pages/doctor/doctor-prescriptions/doctor-prescriptions';
import { DoctorDashboardPage } from './../pages/doctor/doctor-dashboard/doctor-dashboard';
import { DoctorPatientsPage } from './../pages/doctor/doctor-patients/doctor-patients';



//Firebase Authentication
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../credentials';

import { ChartModule } from 'angular2-highcharts';
import * as Highcharts from 'highcharts';
import { DoctorsListPage } from '../pages/patientPages/doctors-list/doctors-list';
import { EditBloodSugarLevelPage } from '../pages/patientPages/medicalRecordsPages/edit-blood-sugar-level/edit-blood-sugar-level';
@NgModule({
  declarations: [
    MyApp,

    //User Auth Pages
    SignUpPage,
    SignInPage,
    UserAuthTabsPage,


    TabsPage,
    Tab1Page,
    Tab2Page,
    Tab3Page,

    DashboardPage,
    PatientDoctorPage,
    DoctorsListPage,
    PatientAppointmentsPage,
    AddPatientAppointmentsPage,
    PatientChartsPage,
    BloodSugarChartPage,
    BloodPressureChartPage,
    WeightChartPage,
    CholesterolChartPage,
    
    
    MedicalRecordsModalPage,
    //Medical Records Pages
    BloodSugarLevelPage,
    EditBloodSugarLevelPage,
    BloodPressurePage,
    CholesterolPage,
    InsulinPage,
    KetonesPage,
    WeightPage,

    DoctorTabsPage,
    DoctorDashboardPage,
    DoctorPrescriptionsPage,
    DoctorAppointmentsPage,
    DoctorMessagesPage,
    DoctorPatientsPage

    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartModule.forRoot(Highcharts),

    //AngularFire Authentication
    AngularFireAuthModule,

    //Angular fire database
    AngularFireDatabaseModule,
    //initialize angular app
    
    AngularFireModule.initializeApp(environment.firebaseConfig),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    //User Auth Pages
    SignUpPage,
    SignInPage,
    UserAuthTabsPage,
    
    TabsPage,
    DashboardPage,
    PatientDoctorPage,
    DoctorsListPage,
    PatientAppointmentsPage,
    AddPatientAppointmentsPage,
    PatientChartsPage,
    BloodSugarChartPage,
    BloodPressureChartPage,
    WeightChartPage,
    CholesterolChartPage,

    
    
    //Medical Records Pages
    MedicalRecordsModalPage,
    BloodSugarLevelPage,
    EditBloodSugarLevelPage,
    BloodPressurePage,
    CholesterolPage,
    InsulinPage,
    KetonesPage,
    WeightPage,

    
    Tab1Page,
    Tab2Page,
    Tab3Page,

    DoctorTabsPage,
    DoctorDashboardPage,
    DoctorPrescriptionsPage,
    DoctorAppointmentsPage,
    DoctorMessagesPage,
    DoctorPatientsPage

  ],
  providers: [
    //StatusBar,
    //SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
  ]
})
export class AppModule {}
