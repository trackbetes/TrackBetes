import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the DoctorAppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-appointments',
  templateUrl: 'doctor-appointments.html',
})
export class DoctorAppointmentsPage {

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

      //get appointments
      this.afdb.list(`doctors/${this.currentUserId}/appointments`).subscribe((appointments) => {  
        this.appointments = [];
        //push appointments into appointments array in desc order
        for (let index = appointments.length -1; index >= 0; index--) {
          this.appointments.push(appointments[index]); 
        }
      })
    })
  }

  deleteAppointment(appointment) {
    let alert = this.alertFunc();
    let toast = this.toastFunc();
    alert.setMessage('Are you sure, delete ' + appointment.title + " ?");
    alert.addButton(
      {
        text:'Yes',
        handler:()=> {
          this.afdb.object(`doctors/${this.currentUserId}/appointments/${appointment.$key}`).remove()
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
