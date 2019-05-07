import { DoctorProfilePage } from './../doctor-profile/doctor-profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { PatientAppointmentsPage } from '../../patientPages/patient-appointments/patient-appointments';
import { DoctorAppointmentsPage } from '../doctor-appointments/doctor-appointments';

/**
 * Generated class for the DoctorDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-dashboard',
  templateUrl: 'doctor-dashboard.html',
})
export class DoctorDashboardPage {

  currentUserId;

  doctor = {} as Doctor;

  patientsList = [];

  patientsListRef$;

  appointments = [];

  userHasPatients:boolean = false;

  userHasAppointments:boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afdb: AngularFireDatabase,
    private loadingCtlr: LoadingController,
    private afAuth:AngularFireAuth,
     ) {
      

  }

  ionViewDidLoad() {

    this.patientsListRef$ = this.afdb.list(`patients`);

    let loading = this.loadingFunc();
    loading.setContent('Loading...');
    loading.setSpinner('ios');
    loading.present();

    this.afAuth.authState.subscribe((auth) => {

      this.currentUserId = auth.uid;

      //get doctor's details
      this.afdb.object(`doctors/${this.currentUserId}`).subscribe((doctor) => {
        this.doctor = doctor;
      })

      //get doctor's patients
      this.afdb.list(`doctors/${this.currentUserId}/patients`).subscribe((patients) => {
        
        //check if user has patients
        if(patients){
          //push patients to patients list 
          patients.forEach((item) => {
            this.patientsList.push(item);
          });
          this.userHasPatients = true;
          loading.dismiss();
        }else {
          this.userHasPatients = false;
          loading.dismiss();
        }
        
      });

      //get doctor's appointments
      this.afdb.list(`doctors/${this.currentUserId}/appointments`, {
          query: {
            limitToLast : 3
        }
      }).subscribe((appointments) => {
        
        //check if user has appointments
        if(appointments){
          this.appointments = [];

          //push appointments into appointments array in desc order
          for (let index = appointments.length -1; index >= 0; index--) {
              this.appointments.push(appointments[index]); 
          }
          this.userHasAppointments = true;
        }else {
          this.userHasAppointments = false;
        }
        
      });

    });

     
  }

  openProfilePage() {
    this.navCtrl.push(DoctorProfilePage);
  }

  openPatientPage(){
    this.navCtrl.parent.select(1);
  }

  openAppointmentsPage() {
    this.navCtrl.push(DoctorAppointmentsPage);
  }

  loadingFunc(){
    return this.loadingCtlr.create();
  }

}
