import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import Parse from 'parse';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private username;
  private password;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public sp: ServiceProvider, public toastCtrl: ToastController, public loadCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signUp() {
    this.navCtrl.push('SignUpPage');
  }

  signIn() {

    // let loader = this.loadCtrl.create({
    //   content: 'Signing in...'
    // });
    // loader.present();

    // this.sp.login(this.username, this.password).subscribe((success) => {

    //   this.navCtrl.setRoot('HomePage');
    //   loader.dismissAll();
    // }, (error) => {
    //   alert('Invalid username or password');
    //   loader.dismissAll();
    // });

    Parse.User.logIn(this.username, this.password)
      .then((resp) => {
        console.log('Logged in successfully', resp);
        // If you app has Tabs, set root to TabsPage
        this.navCtrl.setRoot('HomePage')
      }, err => {
        console.log('Error logging in', err);

        this.toastCtrl.create({
          message: err.message,
          duration: 2000
        }).present();
      });
  }

}
