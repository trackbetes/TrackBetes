import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the DoctorsListProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctors-list-profile',
  templateUrl: 'doctors-list-profile.html',
})
export class DoctorsListProfilePage {

  doctorProfile = {} as Doctor;

  doctorId:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtlr: AlertController,
    private afdb: AngularFireDatabase,
     private afAuth: AngularFireAuth,
    public viewCtlr: ViewController,
    private toastCtlr: ToastController,
    ) {
  }

  ionViewDidLoad() {
    //get doctor data from previous page
    this.doctorProfile = this.navParams.get('doctor');

    //get id of selected doctor
    this.doctorId = this.navParams.get('doctor').$key;
    
  }

  addDoctor(){
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
          alert.setMessage('Do you want ' + this.doctorProfile.username + ' as your doctor?');
          alert.addButton({
            text:'Yes',

            //adds current user to the patients of the selected doctor
            handler:() => {
              this.afdb.object(`doctors/${this.doctorId}/patients/${auth.uid}`).update({
                'username': data.username,
              })

              //sets the doctor id of the current user to the id of the selected doctor
              if (user.update({
                'doctorId': this.doctorId,
              })) {

                //notify user that doctor has been added
                let toast = this.toastFunc();
                toast.setMessage('You have been assigned a doctor');
                toast.setDuration(2000);
                toast.present();

                this.viewCtlr.dismiss();
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
  }

  closeModal() {
    this.viewCtlr.dismiss();
  }

  alertFunc(){
    return this.alertCtlr.create();
  }

  toastFunc() {
    return this.toastCtlr.create();
  }

}
