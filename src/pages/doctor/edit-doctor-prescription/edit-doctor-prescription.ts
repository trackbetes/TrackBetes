import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Prescription } from '../../../models/Prescription';

/**
 * Generated class for the EditDoctorPrescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-doctor-prescription',
  templateUrl: 'edit-doctor-prescription.html',
})
export class EditDoctorPrescriptionPage {
  prescription = {
    medicationName:'',
    dosage:'',
    doctorInCharge:'',
    notes:'',

  }

  updatedPrescription = {} as Prescription;

  messages = {
    emptyFields:'You forgot to fill one or more fields, please check and try again',
    addedEntry:'New records have been added successfully',
    noAddedRecord:'You have not added any record, do u still want to leave ?',
    savingRecords:'Saving your records, please wait...'
    
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtlr: ViewController,
    private toastCtlr: ToastController,) {
  }

  ionViewDidLoad() {

    this.prescription.medicationName = this.navParams.get('prescription').medicationName;
    this.prescription.dosage = this.navParams.get('prescription').dosage;
    this.prescription.doctorInCharge = this.navParams.get('prescription').doctorInCharge;
    this.prescription.notes = this.navParams.get('prescription').notes;

    //updates prescription model with selected prescription data
    this.updatedPrescription = this.navParams.get('prescription');


  }

  savePrescription() {
    if(this.validatedInputs()) {
      this.updatedPrescription.medicationName = this.prescription.medicationName;
      this.updatedPrescription.dosage = this.prescription.dosage;
      this.updatedPrescription.doctorInCharge = this.prescription.doctorInCharge;
      this.updatedPrescription.notes = this.prescription.notes;
      this.viewCtlr.dismiss();
    }
  }

  validatedInputs(): boolean{
    let toast = this.toastFunc();
    if (!this.prescription.medicationName ||
        !this.prescription.dosage ||
        !this.prescription.doctorInCharge ||
        !this.prescription.notes){
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
