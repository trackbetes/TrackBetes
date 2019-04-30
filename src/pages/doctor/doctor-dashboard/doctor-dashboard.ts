import { DoctorProfilePage } from './../doctor-profile/doctor-profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

/**
 * Generated class for the DoctorDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-dashboard',
  templateUrl: 'doctor-dashboard.html',
})
export class DoctorDashboardPage {

  doctor = {} as Doctor;

  patientsList = [];

  patientsListRef$;

  userHasPatients:boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afdb: AngularFireDatabase,
    private loadingCtlr: LoadingController,
    private afAuth:AngularFireAuth,
     ) {
      

  }

  ionViewDidLoad() {

    this.patientsListRef$ = this.afdb.list(`patients`);

    let loading = this.loadingFunc();
    loading.setContent('Loading...');
    loading.setSpinner('ios');
    loading.present();

    this.afAuth.authState.subscribe((auth) => {

      //get User data
      this.afdb.object(`doctors/${auth.uid}`).subscribe((userData) => {
        
        //check if user has patients
        if (userData.patients) {
          this.afdb.list(`patients`).subscribe((data) => {

            //push patients to patients list 
            data.forEach((item) => {
              this.patientsList.push(item);
            });
            this.userHasPatients = true;
            loading.dismiss();
          });
        }else {
          this.userHasPatients = false;
          loading.dismiss();
        }

        this.doctor = userData;
      });
      
     });

     
  }

  openProfilePage() {
    this.navCtrl.push(DoctorProfilePage);
  }

  openPatientPage(){
    this.navCtrl.parent.select(1);
  }

  loadingFunc(){
    return this.loadingCtlr.create();
  }

}
