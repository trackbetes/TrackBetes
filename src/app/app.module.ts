import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SignInPage } from '../pages/sign-in/sign-in';
import { DashboardPage } from '../pages/patientPages/dashboard/dashboard';
import { MedicalRecordsModalPage } from '../pages/patientPages/medical-records-modal/medical-records-modal';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { TabsPage } from '../pages/patientPages/tabs/tabs';
import { Tab1Page } from '../pages/patientPages/tab1/tab1';
import { Tab2Page } from '../pages/patientPages/tab2/tab2';
import { Tab3Page } from '../pages/patientPages/tab3/tab3';
import { BloodPressurePage } from '../pages/patientPages/medicalRecordsPages/blood-pressure/blood-pressure';
import { BloodSugarLevelPage } from '../pages/patientPages/medicalRecordsPages/blood-sugar-level/blood-sugar-level';
import { CholesterolPage } from '../pages/patientPages/medicalRecordsPages/cholesterol/cholesterol';
import { InsulinPage } from '../pages/patientPages/medicalRecordsPages/insulin/insulin';
import { KetonesPage } from '../pages/patientPages/medicalRecordsPages/ketones/ketones';
import { WeightPage } from '../pages/patientPages/medicalRecordsPages/weight/weight';

const firebaseAuth  = {
    apiKey: "AIzaSyByq1Xdud3O8O9tn29bPNi5S_SkN31kI0g",
    authDomain: "trackbetes-c1f76.firebaseapp.com",
    databaseURL: "https://trackbetes-c1f76.firebaseio.com",
    projectId: "trackbetes-c1f76",
    storageBucket: "trackbetes-c1f76.appspot.com",
    messagingSenderId: "374545558617"
} 

@NgModule({
  declarations: [
    MyApp,
    SignUpPage,
    SignInPage,
    DashboardPage,
    MedicalRecordsModalPage,
    //Medical Records Pages
    BloodPressurePage,
    BloodSugarLevelPage,
    CholesterolPage,
    InsulinPage,
    KetonesPage,
    WeightPage,
    
    TabsPage,
    Tab1Page,
    Tab2Page,
    Tab3Page
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignUpPage,
    SignInPage,
    DashboardPage,
    MedicalRecordsModalPage,
    //Medical Records Pages
    BloodPressurePage,
    BloodSugarLevelPage,
    CholesterolPage,
    InsulinPage,
    KetonesPage,
    WeightPage,

    TabsPage,
    Tab1Page,
    Tab2Page,
    Tab3Page

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
