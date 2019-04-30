import { Patient } from './../../../models/Pateint';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

/**
 * Generated class for the PatientProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-profile',
  templateUrl: 'patient-profile.html',
})
export class PatientProfilePage {

  currentUserId;

  patient = {} as Patient;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtlr: ViewController,
    private afdb: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private toastCtlr: ToastController) {
  }

  ionViewDidLoad(){
    this.afAuth.authState.take(1).subscribe((auth) => {
      this.currentUserId = auth.uid;

      //get doctor data
      this.afdb.object(`patients/${this.currentUserId}`).subscribe((patient) => {
        this.patient = patient;
      })
      
   })
  }

  saveProfile() {
    if(this.validateInputs()) {

      //set doctor's profile data
      this.afdb.object(`patients/${this.currentUserId}`).update(this.patient);

      //set doctor's user profile data
      this.afdb.object(`user profile/${this.currentUserId}`).update({
        username: this.patient.username,
      });
      
      this.navCtrl.pop();
    }
    
  }

  closeModal() {
    this.viewCtlr.dismiss();
  }

  validateInputs(): boolean{
    let toast = this.toastFunc();
    if (this.patient.username === ''){
          toast.setMessage('You forgot to enter some details');
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

}
