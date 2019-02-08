import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { SignInPage } from '../sign-in/sign-in';
import { DashboardPage } from '../patientPages/dashboard/dashboard';
import { AngularFireAuth } from '@angular/fire/auth';


/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  @ViewChild('userEmail') userEmail;
  @ViewChild('userPassword') userPassword;

  userType: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth, private toastCtlr: ToastController, private alertCtlr: AlertController) {
  }

  alert(message) {
    let alert = this.alertCtlr.create();
    alert.setMessage(message);
    alert.present();
  }

  openSignInPage() {
    this.navCtrl.setRoot(SignInPage);
  }

  createAccount() {
    this.fire.auth.createUserWithEmailAndPassword(this.userEmail.value, this.userPassword.value)
    .then(() => {
      this.toastFunc();
      this.navCtrl.push(SignInPage, {"userType":this.userType});

    })
    .catch(error => {
      this.alert(error.message);
    })
  }

  toastFunc(){
    let toast = this.toastCtlr.create({
      closeButtonText:"OK"
    });
    toast.setMessage("You can log into your account");
    toast.setPosition('top');
    toast.setDuration(2000);
    toast.present();
  }

}
