import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignInPage } from '../sign-in/sign-in';
import { SignUpPage } from '../sign-up/sign-up';


@IonicPage()
@Component({
  selector: 'page-user-auth-tabs',
  templateUrl: 'user-auth-tabs.html',
})
export class UserAuthTabsPage {

  SignInPage = SignInPage;
  SignUpPage = SignUpPage;

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
  
  }

}
