import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, ItemSliding, ModalController, AlertController } from 'ionic-angular';
import { Prescription } from '../../../models/Prescription';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { EditDoctorPrescriptionPage } from '../edit-doctor-prescription/edit-doctor-prescription';

/**
 * Generated class for the AddDoctorPrescriptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-doctor-prescriptions',
  templateUrl: 'add-doctor-prescriptions.html',
})
export class AddDoctorPrescriptionsPage {

  prescriptions = {} as Prescription;

  addedPrescriptions = [];

  currentUserId;

  doctor = {} as Doctor;

  messages = {
    emptyFields:'You forgot to fill one or more fields, please check and try again',
    addedEntry:'New prescriptions have been added successfully',
    noAddedPrescription:'You have not added any prescription, do you still want to leave ?',
    savingPrescriptions:'Saving your prescriptions, please wait...'
    
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private viewCtlr: ViewController,private afAuth:AngularFireAuth,
    private afdb: AngularFireDatabase, private loadingCtlr: LoadingController,private toastCtlr: ToastController,
    private modalCtlr: ModalController,
    private alertCtlr: AlertController,) {
  }

  ionViewDidLoad() {
    
    let loading = this.loadingFunc();
    loading.setContent('Loading...');
    loading.setSpinner('ios');
    loading.present();

    this.afAuth.authState.subscribe((auth) => {

      this.currentUserId = auth.uid;

      //get doctor's details
      this.afdb.object(`doctors/${this.currentUserId}`).subscribe((doctor) => {
        this.doctor = doctor;
        this.prescriptions.doctorInCharge = doctor.officialName;
        loading.dismiss();
      })
    });
  }

  savePrescriptions() {
    let savedRecordToAfdb = false;
    let alert = this.alertFunc();
    let loading = this.loadingFunc();
    loading.setSpinner('ios');
    loading.setContent(this.messages.savingPrescriptions);

    if(this.addedPrescriptions.length <= 0) {
      
      alert.setMessage(this.messages.noAddedPrescription);
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

      for(index; index < this.addedPrescriptions.length; index++) {
        
        //adds prescriptions to list of prescriptions in firebase database
        this.getPrescriptionsRef().push({
          medicationName:this.addedPrescriptions[index].medicationName,
          dosage:this.addedPrescriptions[index].dosage,
          doctorInCharge:this.addedPrescriptions[index].doctorInCharge,
          notes:this.addedPrescriptions[index].notes,
          userId: this.currentUserId,

        }).then((index)=>{
        
         count++;
         if(count === this.addedPrescriptions.length) {
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

        /*this.getDoctorAppointmentsRef().push({
          title:this.addedAppointments[index].title,
          date:moment(this.addedAppointments[index].date).format('DD-MM-YYYY'),
          time:moment(this.addedAppointments[index].time).format('h:mm:a'),
          message:this.addedAppointments[index].message,
          userId: this.currentUserId,
        })*/

     }

    }
  }

  addPrescription() {
    if(this.validatedInputs()) {
      //create precription object 
      let prescription = {
        medicationName: this.prescriptions.medicationName,
        dosage: this.prescriptions.dosage,
        doctorInCharge: this.prescriptions.doctorInCharge,
        notes: this.prescriptions.notes,
        patientId: this.prescriptions.patientId,
        doctorId: this.currentUserId,
      }

      //adds prescription to precriptions array
      this.addedPrescriptions.push(prescription);

      //clears the precription model
      this.prescriptions = {
        medicationName: '',
        dosage: '',
        doctorInCharge:this.doctor.officialName,
        notes:'',
        patientId:'',
        doctorId:this.currentUserId,
      }
    }
  }

  editAddedPrescriptions(prescription: Prescription, slidingItem: ItemSliding) {
    let modal = this.modalFunc(EditDoctorPrescriptionPage, {'prescription': prescription});
    modal.present();
    slidingItem.close();
  }

  deleteAddedPrescription(prescription: Prescription, slidingItem: ItemSliding) {
    let alert = this.alertFunc();
    alert.setMessage('Are you sure, delete ' + prescription.medicationName + " ?");
    alert.addButton(
      {
        text:'Yes',
        handler:()=> {
          let index = this.addedPrescriptions.indexOf(prescription);
          if (index > -1)
            this.addedPrescriptions.splice(index, 1);
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

  getPrescriptionsRef() {
    //creates a node in firebase which holds list of prescriptions
    return this.afdb.list(`prescriptions/${this.currentUserId}`);
     
  }

  getPatientPrescriptionsRef() {
    //return this.afdb.list(`patients/${this.doctorId}/appointments`);
  }

  validatedInputs(): boolean{
    let toast = this.toastFunc();
    if (!this.prescriptions.medicationName ||
        !this.prescriptions.dosage ||
        !this.prescriptions.doctorInCharge ||
        !this.prescriptions.notes){
        toast.setMessage(this.messages.emptyFields);
        toast.setShowCloseButton(true);
        toast.present();
        return false;
      }else {
        return true;
    }
  }

  alertFunc() {
    return this.alertCtlr.create();
    
  }

  loadingFunc(){
    return this.loadingCtlr.create();
  }

  modalFunc(modalPage, args?) {
    return this.modalCtlr.create(modalPage, args);
  }

  toastFunc() {
    return this.toastCtlr.create();
  }


  closeModal() {
    this.viewCtlr.dismiss();
  }

}
