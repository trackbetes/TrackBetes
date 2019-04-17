import { DoctorTabsPage } from './../../doctor/doctor-tabs/doctor-tabs';
import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, App, MenuController, LoadingController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { User } from '../../../models/User';
import { UserProfile } from './../../../models/UserProfile';

import { TabsPage } from '../../patientPages/tabs/tabs';
@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  user = {
    email:'',
    password:''
  } as User;

  userProfileData: FirebaseObjectObservable<UserProfile>

  private usertype = {
    type1:'patient',
    type2:'doctor',
  }

  messages = {
    emptyFields:'You forgot to fill one or more fields, please check and try again',
    incorrectCredentials:'The email and password entered cannot be found in our system. <br> Please check and try again',
    loading:'Signing you in...'
  }
  


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private afAuth:AngularFireAuth,
    private afdb: AngularFireDatabase, 
    private toastCtlr: ToastController,
    private alertCtlr: AlertController,
    private app: App,
    private menuCtlr: MenuController,
    private loadingCtlr: LoadingController){
      
      //disable sidemenu on sign in page 
      this.menuCtlr.enable(false, 'sideMenu');    
  }

  
  signIn(user: User) {
    let toast = this.toastFunc();
    let alert = this.alertFunc();
    let loading = this.loadingFunc();

    loading.setSpinner('ios');
    loading.setContent(this.messages.loading);

    if(this.validateInputs()){
      
    //sign in authentication using firebase
      this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password).
      then(() => {

        loading.present();

        //get current user data
        this.afAuth.authState.take(1).subscribe((auth) => {
          this.afdb.object( `user profile/${auth.uid}`).subscribe((data)=> {
            
            loading.dismiss();
            
            //check usertype
            switch (data.usertype) {

              //If user is a patient
              case this.usertype.type1:
                this.app.getRootNav().setRoot(TabsPage);
                break;

              //If user is a doctor
              case this.usertype.type2:
                this.app.getRootNav().setRoot(DoctorTabsPage);
              break;
              default:
                break;
            }
          })
        })
      })
      .catch((error) => {
        alert.setSubTitle('Alert');
        alert.setMessage(error.message);
        alert.present();
      })
    
    }else 
      return;
    

  }

  loadingFunc() {
    return this.loadingCtlr.create();
  }


  toastFunc() {
    return this.toastCtlr.create();
  }

  alertFunc() {
    return this.alertCtlr.create();
  }

  validateInputs(): boolean{
    let toast = this.toastFunc();
    if (this.user.email == '' ||
        this.user.password == ''){
          toast.setMessage(this.messages.emptyFields);
          toast.setShowCloseButton(true);
          toast.present();
          return false;
      }else {
        return true;
    }
  }

}
