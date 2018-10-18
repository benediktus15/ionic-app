import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Parse from 'parse';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public alertCtlr: AlertController, public sp: ServiceProvider) {
    this.signupForm = this.formBuilder.group({
      'username': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  async signup() {
    //Create a new user on Parse
    var user = new Parse.User();
    user.set("username", this.signupForm.value.username);
    user.set("password", this.signupForm.value.password);
    user.set("email", this.signupForm.value.email);

    // other fields can be set just like with Parse.Object
    try {
      await user.signUp();
      // Hooray! Let them use the app now.
      this.presentAlert("success!", "User created", "User created with success, now you can login");
      this.navCtrl.setRoot('LoginPage')
    } catch (error) {
      // Show the error message somewhere and let the user try again.
      this.presentAlert("Error:", error.code, error.message);
    }

  };

  async presentAlert(header, subtitle, message) {
    const alert = await this.alertCtlr.create({
      title: header,
      subTitle: subtitle,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


  login(){
    this.navCtrl.setRoot('LoginPage')
  }

}
