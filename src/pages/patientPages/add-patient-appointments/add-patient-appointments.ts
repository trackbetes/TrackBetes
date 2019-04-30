import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtlr: ViewController,
    private afdb: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private toastCtlr: ToastController) {
  }

  ionViewDidLoad() {
    
  }

  closeModal() {
    this.viewCtlr.dismiss();
  }

}
