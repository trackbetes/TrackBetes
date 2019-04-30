import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';


/**
 * Generated class for the DoctorPersonalnContactProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-personaln-contact-profile',
  templateUrl: 'doctor-personaln-contact-profile.html',
})

export class DoctorPersonalnContactProfilePage {

  doctor = {} as Doctor

  currentUserId;

  doctorProfileRef$: FirebaseObjectObservable<Doctor>

  doctorProfile: FirebaseObjectObservable<Doctor>

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
      this.afdb.object(`doctors/${this.currentUserId}`).subscribe((doctor) => {
        this.doctor = doctor;
      })
      
   })
  }

  saveProfile() {
    if(this.validateInputs) {

      //set doctor's profile data
      this.afdb.object(`doctors/${this.currentUserId}`).update(this.doctor);

      //set doctor's user profile data
      this.afdb.object(`user profile/${this.currentUserId}`).update({
        username: this.doctor.username,
      });
    }
    this.navCtrl.pop();
  }

  closeModal() {
    this.viewCtlr.dismiss();
  }

  validateInputs(): boolean{
    let toast = this.toastFunc();
    if (this.doctor.username == ''){
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
