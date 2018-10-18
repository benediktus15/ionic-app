import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, App } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public sp: ServiceProvider, public toastCtrl: ToastController, public alertCtlr: AlertController, public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionViewWillEnter() {
    this.sp.getGameScore();
  }

  detail(i) {
    this.sp.score = i;
    this.navCtrl.push('DetailPage')
  }

  edit(i) {
    this.sp.score = i;
    this.navCtrl.push('EditPage');
  }

  create() {
    this.sp.create();
    this.navCtrl.push('CreatePage')
  }

  query
  scores = []

  async delete(score) {
    const alert = await this.alertCtlr.create({
      title: 'Confirm!',
      message: 'Are you sure want to delete this info?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'tertiary',
          handler: () => {
            console.log('cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            // this.sp.delete(score);
            this.query.get(score.id)
            .then((myObject) => {
              myObject.destroy();
              let i = this.scores.indexOf(score);
      
              this.scores.splice(i, 1);
            }, (error) => {
              // The delete failed.
              // error is a Parse.Error with an error code and message.
            });
          }
        }
      ]
    });
    await alert.present();
  }

  logOut() {
    this.sp.logOut()
    this.app.getRootNav().setRoot('LoginPage');
  }

  async presentAlert(header, subtitle, message) {
    const alert = await this.alertCtlr.create({
      title: header,
      subTitle: subtitle,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
