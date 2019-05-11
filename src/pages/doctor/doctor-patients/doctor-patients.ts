import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { DoctorSelectedPatientPage } from '../../doctor-selected-patient/doctor-selected-patient';

/**
 * Generated class for the DoctorPatientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-patients',
  templateUrl: 'doctor-patients.html',
})
export class DoctorPatientsPage {
  searchQuery: string = '';

  searchedPatients = [];

  currentUserId;

  patients = [];

  userHasPatients: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afdb: AngularFireDatabase,
    private afAuth:AngularFireAuth,
    private loadingCtlr: LoadingController,
    private modalCtlr: ModalController,) {
   
  }

  ionViewDidLoad(){
    let loading = this.loadingFunc();
    loading.setContent('Loading...');
    loading.setSpinner('ios');
    loading.present();

    this.afAuth.authState.subscribe((auth) => {
      this.currentUserId = auth.uid;

      this.getDoctorPatientsRef().subscribe((patients) => {
        //check if user has patients
        if(patients.length > 0){
          this.patients = [];
  
          //push patients to patients list 
          for (let index = patients.length -1; index >= 0; index--) {
            this.patients.push(patients[index]); 
          }
  
          this.userHasPatients = true;
          this.initializeSearchPatients();
          loading.dismiss();
        }else {
          this.userHasPatients = false;
          loading.dismiss();
        }
      })
    });

    
  }


  initializeSearchPatients() {
    //empty searched patients every time the function is called 
    this.searchedPatients = [];

    //push patients to serached patients array
    this.patients.forEach((item) => {
      this.searchedPatients.push(item);
    })
  }

  getSearchedPatients(ev: any) {
    // Reset items back to all of the items
    this.initializeSearchPatients();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.searchedPatients = this.searchedPatients.filter((item)=> {
        return (item.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  
  }

  openSelectedPatientPage(patient) {
    this.navCtrl.push(DoctorSelectedPatientPage, {'patient': patient});
  }

  getDoctorPatientsRef() {
    return this.afdb.list(`doctors/${this.currentUserId}/patients`);
  }

  loadingFunc(){
    return this.loadingCtlr.create();
  }

  modalFunc(modalPage, params?) {
    return this.modalCtlr.create(modalPage, params);
  } 

  


}
