import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, ItemSliding, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Appointment } from '../../../models/Appointment';
import * as moment from 'moment';
import { EditPatientAppointmentPage } from '../../edit-patient-appointment/edit-patient-appointment';

/**
 * Generated class for the AddPatientAppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-patient-appointments',
  templateUrl: 'add-patient-appointments.html',
})
export class AddPatientAppointmentsPage {

  appointments = {} as Appointment;

  addedAppointments = [];

  currentDateTime = {
    date: new Date().toISOString(),
    time: new Date().toISOString(),
  }

  currentUserId;

  messages = {
    emptyFields:'You forgot to fill one or more fields, please check and try again',
    addedEntry:'New appointments have been added successfully',
    noAddedAppointment:'You have not added any appointment, do u still want to leave ?',
    savingAppointments:'Saving your appointments, please wait...'
    
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtlr: ViewController,
    private modalCtlr: ModalController,
    private afdb: AngularFireDatabase,
    private alertCtlr: AlertController,
    private afAuth: AngularFireAuth,
    private toastCtlr: ToastController,
    public loadingCtlr: LoadingController) {
  }

  ionViewDidLoad() {

    //gets id of current user
    this.afAuth.authState.subscribe((auth) => {
      this.currentUserId = auth.uid;
    });

    //assigns current date and time
    this.appointments.date = this.currentDateTime.date;
    this.appointments.time = this.currentDateTime.time;
  }

  saveAppointments() {
    let savedRecordToAfdb = false;
    let alert = this.alertFunc();
    let loading = this.loadingFunc();
    loading.setSpinner('ios');
    loading.setContent(this.messages.savingAppointments);

    if(this.addedAppointments.length <= 0) {
      
      alert.setMessage(this.messages.noAddedAppointment);
      alert.addButton({
        text:'yes',
        handler: () => {
          this.viewCtlr.dismiss();
        }
      });
      alert.addButton({
        text:'No',
        handler: () => {
          return;
        }
      })
      alert.present();
    }else{
      let toast = this.toastFunc();
      let index = 0;
      let count = 0;
      loading.present();

      for(index; index < this.addedAppointments.length; index++) {
        
        //adds appointments to list of appointments in firebase database
        this.getAppointmentsRef().push({
         title:this.addedAppointments[index].title,
         date:this.addedAppointments[index].date,
         time:this.addedAppointments[index].time,
         message:this.addedAppointments[index].message,
       }).then((index)=>{
         count++;
         if(count === this.addedAppointments.length) {
           savedRecordToAfdb = true;
           loading.dismiss();
           toast.setMessage(this.messages.addedEntry);
           toast.setDuration(2000);
           toast.setPosition('top');
           toast.present();
           this.viewCtlr.dismiss();
         }
       }).catch((error)=> {
         alert.setMessage(error.message);
       })
     }

    }
  }

  addAppointment() {

    if(this.validatedInputs()) {
       //create appointment object 
       let appointment = {
        title: this.appointments.title,
        date: this.appointments.date,
        time: this.appointments.time,
        message: this.appointments.message,
      }

      //adds appoinment to appoinments array
      this.addedAppointments.push(appointment);

      //clears the appointment model
      this.appointments = {
        title:'',
        date: this.currentDateTime.date,
        time: this.currentDateTime.time,
        message:'',
      }
    }
    
     
  }

  editAddedAppointment(appointment: Appointment, slidingItem: ItemSliding) {
    let modal = this.modalFunc(EditPatientAppointmentPage, {'appointment': appointment});
    modal.present();
    slidingItem.close();
  }

  deleteAddedAppointment(appointment, slidingItem: ItemSliding) {
    let alert = this.alertFunc();
    alert.setMessage('Are you sure, delete ' + appointment.title + " ?");
    alert.addButton(
      {
        text:'Yes',
        handler:()=> {
          let index = this.addedAppointments.indexOf(appointment);
          if (index > -1)
            this.addedAppointments.splice(index, 1);
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
    slidingItem.close();
  }

  getAppointmentsRef() {
    //creates a node in firebase which holds list of appointments
    return this.afdb.list(`appointments/${this.currentUserId}`);
     
  }

  validatedInputs(): boolean{
    let toast = this.toastFunc();
    if (!this.appointments.title ||
        !this.appointments.date ||
        !this.appointments.time ||
        !this.appointments.message){
        toast.setMessage(this.messages.emptyFields);
        toast.setShowCloseButton(true);
        toast.present();
        return false;
      }else {
        return true;
    }
  }

  toastFunc() {
    return this.toastCtlr.create();
  }

  alertFunc() {
    return this.alertCtlr.create();
    
  }

  modalFunc(modalPage, args?) {
    return this.modalCtlr.create(modalPage, args);
  }

  loadingFunc() {
    return this.loadingCtlr.create();
  }

  closeModal() {
    this.viewCtlr.dismiss();
  }

}
