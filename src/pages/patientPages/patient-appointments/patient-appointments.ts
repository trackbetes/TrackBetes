import { Appointment } from './../../../models/Appointment';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AddPatientAppointmentsPage } from '../add-patient-appointments/add-patient-appointments';

/**
 * Generated class for the PatientAppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-appointments',
  templateUrl: 'patient-appointments.html',
})
export class PatientAppointmentsPage {

  modal:any;

  currentUserId;

  appointments = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afdb: AngularFireDatabase,
    private afAuth:AngularFireAuth,
    private alertCtlr: AlertController,
    private toastCtlr: ToastController,
    private modalCtlr: ModalController) {
  }

  ionViewDidLoad() {

      //gets id of current user
      this.afAuth.authState.subscribe((auth) => {
        this.currentUserId = auth.uid;

        //get patient's appointments
        this.afdb.list(`appointments/${this.currentUserId}`).subscribe((appointments) => {  
          this.appointments = [];
          //push appointments into appointments array in desc order
          for (let index = appointments.length -1; index >= 0; index--) {
            this.appointments.push(appointments[index]); 
          }
        })
      })   

      
  }

  openAddAppointmentsModal() {
    this.modal = this.modalFunc(AddPatientAppointmentsPage);
    this.modal.present();
}

  deleteAppointment(appointment) {
    let alert = this.alertFunc();
    let toast = this.toastFunc();
    alert.setMessage('Are you sure, delete ' + appointment.title + " ?");
    alert.addButton(
      {
        text:'Yes',
        handler:()=> {
          this.afdb.object(`appointments/${this.currentUserId}/${appointment.$key}`).remove()
          .then(() => {
            toast.setMessage('Appointment has been deleted');
            toast.setDuration(2000);
          })
          .catch((error) => {
            toast.setMessage('Something happened... appointment wasn\'t deleted');    
          })
        }
      }
    );
    alert.addButton(
      {
        text:'No',
        handler: ()=> {
          return;
        } 
      }
    );
    
    alert.present();
    
  }

  alertFunc() {
    return this.alertCtlr.create();
    
  }

  modalFunc(modalPage) {
    return this.modalCtlr.create(modalPage);
}

  toastFunc() {
    return this.toastCtlr.create();
  }



}
