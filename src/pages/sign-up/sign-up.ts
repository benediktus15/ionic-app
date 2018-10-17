import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import Parse from 'parse';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  private username = '';
  private password = '';
  // private email = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public sp: ServiceProvider, public toastCtrl: ToastController, public loadCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }


  signUp() {

    // let loader = this.loadCtrl.create({
    //   content: 'Signing up...'
    // });
    // loader.present();

    // this.sp.signUp(this.username, this.password, this.email).subscribe((success) => {
    //   // loader.dismissAll();
    //   this.toastCtrl.create({
    //     message: 'Account created successfully',
    //     duration: 2000
    //   }).present();
    // }, (error) => {
    //   // loader.dismissAll();
    // });

    Parse.User.signUp(this.username, this.password).then((resp) => {
      console.log('Logged in successfully', resp);

      // Clears up the form
      this.username = '';
      this.password = '';

      this.toastCtrl.create({
        message: 'Account created successfully',
        duration: 2000
      }).present();
    }, err => {
      console.log('Error signing in', err);

      this.toastCtrl.create({
        message: err.message,
        duration: 2000
      }).present();
    });
  }

  signIn() {
    this.navCtrl.setRoot('LoginPage');
  }
}
