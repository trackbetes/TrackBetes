import { AddDoctorPrescriptionsPage } from './../add-doctor-prescriptions/add-doctor-prescriptions';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the DoctorPrescriptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-prescriptions',
  templateUrl: 'doctor-prescriptions.html',
})
export class DoctorPrescriptionsPage {

  currentUserId;

  prescriptions = [];

  modal:any;

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
      this.afdb.list(`prescriptions/${this.currentUserId}`).subscribe((prescriptions) => {  
        this.prescriptions = [];
        //push prescriptions into prescriptions array in desc order
        for (let index = prescriptions.length -1; index >= 0; index--) {
          this.prescriptions.push(prescriptions[index]); 
        }
        
      })
    })
  }

  deletePrescription(prescription) {
    let alert = this.alertFunc();
    let toast = this.toastFunc();
    alert.setMessage('Are you sure, delete ' + prescription.title + " ?");
    alert.addButton(
      {
        text:'Yes',
        handler:()=> {
          this.afdb.object(`prescriptions/${this.currentUserId}/${prescription.$key}`).remove()
          .then(() => {
            toast.setMessage('prescription has been deleted');
            toast.setDuration(2000);
          })
          .catch((error) => {
            toast.setMessage('Something happened... prescription wasn\'t deleted');    
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

  openAddPrescriptionsModal() {
    this.modal = this.modalFunc(AddDoctorPrescriptionsPage);
    this.modal.present();
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
