import { AddDoctorPrescriptionsPage } from './../add-doctor-prescriptions/add-doctor-prescriptions';
import { DoctorPrescriptionsPage } from './../doctor-prescriptions/doctor-prescriptions';
import { DoctorProfilePage } from './../doctor-profile/doctor-profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Events } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { PatientAppointmentsPage } from '../../patientPages/patient-appointments/patient-appointments';
import { DoctorAppointmentsPage } from '../doctor-appointments/doctor-appointments';
import { AddPatientAppointmentsPage } from '../../patientPages/add-patient-appointments/add-patient-appointments';
import { DoctorPatientsPage } from '../doctor-patients/doctor-patients';
import { DoctorSelectedPatientPage } from '../../doctor-selected-patient/doctor-selected-patient';

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

  prescriptions = [];

  userHasPatients:boolean = false;

  userHasAppointments:boolean = false;

  userHasPrescriptions: boolean = false;

  modal:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afdb: AngularFireDatabase,
    private loadingCtlr: LoadingController,
    private afAuth:AngularFireAuth,
    private modalCtlr: ModalController,
    public events: Events
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
      this.afdb.list(`doctors/${this.currentUserId}/patients`, {
          query: {
            limitToLast : 3
        }
      }).subscribe((patients) => {
        
        //check if user has patients
        if(patients.length > 0){
          this.patientsList = [];

          //push patients to patients list 
          for (let index = patients.length -1; index >= 0; index--) {
            this.patientsList.push(patients[index]); 
          }

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
        if(appointments.length > 0){
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

      //get doctor's prescriptions
      this.afdb.list(`prescriptions/${this.currentUserId}`, {
          query: {
            limitToLast : 3
          }
        }).subscribe((prescriptions) => {
        
        //check if user has prescriptions
        if(prescriptions.length > 0){
          this.prescriptions = [];

          //push prescriptions into prescriptions array in desc order
          for (let index = prescriptions.length -1; index >= 0; index--) {
              this.prescriptions.push(prescriptions[index]); 
          }
          this.userHasPrescriptions = true;
        }else {
          this.userHasPrescriptions = false;
        }
      
      });

    });

     
  }

  openProfilePage() {
    this.navCtrl.push(DoctorProfilePage);
  }

  openPatientPage(){
    this.navCtrl.push(DoctorPatientsPage);
  }

  openSelectedPatientPage(patient) {
    this.navCtrl.push(DoctorSelectedPatientPage, {'patient': patient});
  }

  openAppointmentsPage() {
    this.navCtrl.push(DoctorAppointmentsPage);
  }

  openPrescriptionsPage() {
    this.navCtrl.push(DoctorPrescriptionsPage);
  }

  openAddPrescriptionsModal() {
    this.modal = this.modalFunc(AddDoctorPrescriptionsPage);
    this.modal.present();
  }

  loadingFunc(){
    return this.loadingCtlr.create();
  }

  modalFunc(modalPage, params?) {
    return this.modalCtlr.create(modalPage, params);
}

}
