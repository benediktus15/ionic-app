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

  loginForm: FormGroup;
  user;

  // username;
  // password;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public alertCtrl: AlertController, public sp: ServiceProvider, public toastCtlr: ToastController) {
    this.loginForm = this.formBuilder.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login() {
    try {
      this.user = await Parse.User.logIn(this.loginForm.value.username, this.loginForm.value.password)
      .then((resp) => {
        this.navCtrl.setRoot('HomePage')
      })
    } catch (error) {
      // Show the error message somewhere and let the user try again.
      this.presentAlert("Error: ", error.code, error.message);
    }
  }

  async presentAlert(header, subtitle, message) {
    const alert = await this.alertCtrl.create({
      title: header,
      subTitle: subtitle,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // login(){
  //   Parse.User.logIn(this.username, this.password)
  //     .then((resp) => {
  //       console.log('Logged in successfully', resp);

  //       this.navCtrl.setRoot('HomePage')
  //     }, err => {
  //       console.log('Error logging in', err);

  //       this.toastCtlr.create({
  //         message: err.message,
  //         duration: 2000
  //       }).present();
  //     });
  // }

  signUp() {
    this.navCtrl.push('SignupPage');
  }

}
