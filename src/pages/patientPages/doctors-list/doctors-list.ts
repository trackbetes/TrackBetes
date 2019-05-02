import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ItemSliding, AlertController, ToastController, ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { DoctorsListProfilePage } from '../doctors-list-profile/doctors-list-profile';

/**
 * Generated class for the DoctorsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctors-list',
  templateUrl: 'doctors-list.html',
})
export class DoctorsListPage {

  doctorsListRef$: any;
  doctorsList: any = [];

  patientRef$:any;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     private afdb: AngularFireDatabase,
     private afAuth: AngularFireAuth,
     private loadingCtlr: LoadingController,
     private alertCtlr: AlertController,
     private toastCtlr: ToastController,
     private modalCtlr: ModalController,) {
      
  }

  ionViewDidLoad() {

    this.patientRef$ = this.afdb.list(`patients`);
    this.doctorsListRef$ = this.afdb.list(`doctors`);

    let loading = this.loadingFunc();
    loading.setContent('Loading doctors...');
    loading.setSpinner('ios');
    loading.present();

    //retrieve list of doctors 
    this.doctorsListRef$.take(1).subscribe((data) => {

    //push doctors to doctors list array
    data.forEach((item) => {
      this.doctorsList.push(item);
      });
      loading.dismiss();
    })
  }

  addDoctor(doctor, slidingItem: ItemSliding) {
    let doctorId = doctor.$key;
    let alert = this.alertFunc();

    this.afAuth.authState.take(1).subscribe((auth)=> {
      let user = this.afdb.object(`patients/${auth.uid}`);
      user.subscribe((data)=> {

        //check if user already has a doctor
        if (data.doctorId) {
          alert.setMessage('You have already been assigned a doctor');
          alert.setBackButtonText('ok');
        }else{

          //if user has no doctor, the selected doctor is added 
          alert.setMessage('Do you want ' + doctor.username + ' as your doctor?');
          alert.addButton({
            text:'Yes',

            //set the doctor id of current user to selected doctor's id
            handler:() => {
              this.afdb.object(`doctors/${doctorId}/patients/${auth.uid}`).update({
                'username': data.username,
              })
              if (user.update({
                'doctorId': doctorId,
              })) {

                //notify user that doctor has been added
                let toast = this.toastFunc();
                toast.setMessage('You have been assigned a doctor');
                toast.setDuration(2000);
                toast.present();
              }
              
            }
          });
        }

      });

    });
    

    alert.addButton({
      text:'No',
      handler:() => {
        return;
      }
    });
    alert.present();
    slidingItem.close();
  }

  viewDoctorProfile(doctor, slidingItem: ItemSliding,) {
    let modal = this.modalCtlr.create(DoctorsListProfilePage, {doctor: doctor});
    modal.present();
    slidingItem.close();
  }

  removeDoctor(doctor, slidingItem: ItemSliding) {
    slidingItem.close();
  }

  alertFunc(){
    return this.alertCtlr.create();
  }

  loadingFunc(){
    return this.loadingCtlr.create();
  }

  toastFunc() {
    return this.toastCtlr.create();
  }

}
