import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Appointment } from '../../models/Appointment';

/**
 * Generated class for the EditPatientAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-patient-appointment',
  templateUrl: 'edit-patient-appointment.html',
})
export class EditPatientAppointmentPage {

  appointment = {
    title:'',
    date:'',
    time:'',
    message:'',
  }

  updatedAppointment = {} as Appointment;

  messages = {
    emptyFields:'You forgot to fill one or more fields, please check and try again',
    addedEntry:'New records have been added successfully',
    noAddedRecord:'You have not added any record, do u still want to leave ?',
    savingRecords:'Saving your records, please wait...'
    
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtlr: ViewController,
    private toastCtlr: ToastController,) {
  }

  ionViewDidLoad() {

    this.appointment.title = this.navParams.get('appointment').title;
    this.appointment.date = this.navParams.get('appointment').date;
    this.appointment.time = this.navParams.get('appointment').time;
    this.appointment.message = this.navParams.get('appointment').message;

    //updates appointment model with selected appointment data
    this.updatedAppointment = this.navParams.get('appointment');

    
  }

  saveAppointment() {
    if(this.validatedInputs()) {
      this.updatedAppointment.title = this.appointment.title;
      this.updatedAppointment.date = this.appointment.date;
      this.updatedAppointment.time = this.appointment.time;
      this.updatedAppointment.message = this.appointment.message;
      this.viewCtlr.dismiss();
    }
  }

  validatedInputs(): boolean{
    let toast = this.toastFunc();
    if (!this.appointment.title ||
        !this.appointment.date ||
        !this.appointment.time ||
        !this.appointment.message){
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

  closeModal() {
    this.viewCtlr.dismiss();
  }

}
