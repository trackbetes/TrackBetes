import { AddPatientAppointmentsPage } from './../add-patient-appointments/add-patient-appointments';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserProfile } from './../../../models/UserProfile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ItemSliding } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { DoctorsListPage } from '../doctors-list/doctors-list';
import { PatientAppointmentsPage } from '../patient-appointments/patient-appointments';

/**
 * Generated class for the PatientDoctorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-doctor',
  templateUrl: 'patient-doctor.html',
})
 
export class PatientDoctorPage {

  currentUserId:any;

  userDoctor:any;

  userHasDoctor:boolean = false;

  modal:any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afdb: AngularFireDatabase,
    private afAuth:AngularFireAuth,
    private modalCtlr: ModalController,
    private loadingCtlr: LoadingController
    ) {

      
  }


  ionViewDidLoad(){

    let loading = this.loadingFunc();
    loading.setContent('Loading...');
    loading.setSpinner('ios');
    loading.present();

   this.afAuth.authState.subscribe((auth) => {

    //get User data
    this.afdb.object(`patients/${auth.uid}`).subscribe((userData) => {
      
      //check if user has doctor
      if (userData.doctorId) {
        this.afdb.object(`doctors/${userData.doctorId}`).subscribe((doctor) => {
          this.userDoctor = doctor;
          this.userHasDoctor = true;
          loading.dismiss();
        });
      }else {
        this.userHasDoctor = false;
        loading.dismiss();
      }
    });
    
   });

  }

  openAppointmentsPage(slidingItem: ItemSliding){
    slidingItem.close();
    this.navCtrl.push(PatientAppointmentsPage);
  }

  openAddAppointmentsModal(slidingItem: ItemSliding) {
    slidingItem.close();
    this.modal = this.modalFunc(AddPatientAppointmentsPage);
    this.modal.present();
  }

  openPrescriptionsPage() {
    this.navCtrl.parent.select(3);
  }

  openMessagesPage() {
    this.navCtrl.parent.select(4);
  }

  
  
  openDoctorsListPage() {
    this.navCtrl.push(DoctorsListPage);
  }
  



  modalFunc(modalPage){
    return this.modalCtlr.create(modalPage);
  }

  loadingFunc(){
    return this.loadingCtlr.create();
  }

}
