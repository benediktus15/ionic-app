import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Parse from 'parse'
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username;
  password;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public alertCtlr: AlertController, public sp: ServiceProvider, public toastCtlr: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    Parse.User.logIn(this.username, this.password)
      .then((resp) => {
        console.log('Logged in successfully', resp);
        
        this.navCtrl.setRoot('HomePage')
      }, err => {
        console.log('Error logging in', err);

        this.toastCtlr.create({
          message: err.message,
          duration: 2000
        }).present();
      });
  }

  signUp() {
    this.navCtrl.push('SignupPage');
  }
}
