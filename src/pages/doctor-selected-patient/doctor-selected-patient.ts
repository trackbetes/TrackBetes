import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the DoctorSelectedPatientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-selected-patient',
  templateUrl: 'doctor-selected-patient.html',
})
export class DoctorSelectedPatientPage {

  patient: any = 'Patient';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtlr: ViewController,
    public afdb: AngularFireDatabase,
    private afAuth:AngularFireAuth,
    private loadingCtlr: LoadingController,) {
  }

  ionViewDidLoad() {
    this.patient = this.navParams.get('patient');

    let loading = this.loadingFunc();
    loading.setContent('Loading...');
    loading.setSpinner('ios');
    //loading.present();

    this.getPatientsRef().subscribe((patient) => {
      this.patient = patient;
      //loading.dismiss();
    })

  }

  getPatientsRef() {
    return this.afdb.object(`patients/${this.patient.$key}`);
  }

  loadingFunc(){
    return this.loadingCtlr.create();
  }

  //close the modal 
  closeModal() {
    this.viewCtlr.dismiss(); 
  }

  


}
