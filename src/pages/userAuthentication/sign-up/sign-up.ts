import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, MenuController} from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { User } from '../../../models/User';
import { UserProfile } from '../../../models/UserProfile';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  user = {
    email:'',
    password:'',
    usertype:'',
  } as User;

  userProfile = {
    username:'',
    usertype:'',
  } as UserProfile

  verifyPassword:string; 

  //creates a reference variable which consists of an array 
  //userRef$: FirebaseListObservable<User[]>


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private afAuth:AngularFireAuth, 
    private toastCtlr: ToastController,
    private alertCtlr: AlertController,
    private afdb: AngularFireDatabase,
    private menuCtlr: MenuController) {

    //disable sidemenu on sign in page 
    this.menuCtlr.enable(false, 'sideMenu');

    //creates a node in firebase which holds list of users
    //this.userRef$ = this.afdb.list('users');
  }

  createAccount(user: User) {
    let toast = this.toastFunc();
    let alert = this.alertFunc();
    if(this.validateInputs() && this.passwordMatch()){
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {

        //adds user profile to firebase database
        this.createUser();
        
        toast.setMessage("You can sign into your account");
        toast.setPosition('top');
        toast.setDuration(3000);
        toast.present();
      })
      .catch(error => {
        alert.setMessage(error.message);
        alert.present();
      })
      
    }else 
      return;
       
  }

  //takes the currently created user's id and creates a user profile
  createUser() {
    this.afAuth.authState.take(1).subscribe((auth) => {

      //set ensures that we have a single version of the data
      this.afdb.object(`user profile/${auth.uid}`).set({
        'username':this.userProfile.username,
        'usertype':this.userProfile.usertype,
      });

      switch (this.userProfile.usertype) {
        case 'patient':
          this.afdb.object(`patients/${auth.uid}`).set({
            'username':this.userProfile.username,
          });
          break;
        case 'doctor':
          this.afdb.object(`doctors/${auth.uid}`).set({
            'username':this.userProfile.username,
          });
      
        default:
          break;
      }
   
    });

  }

  toastFunc() {
    return this.toastCtlr.create();
  }

  alertFunc() {
    return this.alertCtlr.create();
  }

  validateInputs(): boolean{
    let toast = this.toastFunc();
    if (this.userProfile.username == '' ||
        this.user.email == '' ||
        this.user.password == '' ||
        this.userProfile.usertype == ''){
          toast.setMessage('You forgot to enter some details');
          toast.setShowCloseButton(true);
          toast.present();
          return false;
      }else {
        return true;
    }
  }

  passwordMatch(): boolean{
    if (this.user.password !== this.verifyPassword) {
      let toast = this.toastFunc();
      toast.setMessage('The passwords do not match');
      toast.setShowCloseButton(true);
      toast.present();
    }else{
      return true;
    } 
  }

}
