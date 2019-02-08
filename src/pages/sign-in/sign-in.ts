import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { DashboardPage } from '../patientPages/dashboard/dashboard';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  //Array to hold all errors
  errorsArray = Array(); 
  userEmail: string = '';
  userPassword: string = '';


  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth, private alertCtlr: AlertController) {
    
  }



  alert(message) {
    let alert = this.alertCtlr.create();
    alert.setMessage(message);
    alert.present();
  }

  openSignUpPage() {
    this.navCtrl.push(SignUpPage);
  }

 
  
  signIn() {
    

    //sign in authentication using firebase
    /*
      this.fire.auth.signInWithEmailAndPassword(this.userEmail, this.userPassword).
      then(() => {
          this.navCtrl.setRoot(DashboardPage);
      })
      .catch((error) => {
        this.alert(error.message);
      })
    */

  }
}
