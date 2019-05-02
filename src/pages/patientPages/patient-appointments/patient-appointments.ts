import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

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

  currentUserId;

  appointments = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afdb: AngularFireDatabase,
     private afAuth:AngularFireAuth,) {
  }

  ionViewDidLoad() {

      //gets id of current user
      this.afAuth.authState.subscribe((auth) => {
        this.currentUserId = auth.uid;

        //get patient's appointments
        this.afdb.list(`appointments/${this.currentUserId}`, {
          query: {
              orderByChild: 'date',
          }
        }).subscribe((appointments) => {  
          this.appointments = [];
          appointments.forEach( (appointment) => {
              this.appointments.push(appointment);
          });
        })
      })   

      
  }

}
