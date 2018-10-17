import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import Parse from 'parse';
import { isUndefined } from 'util';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  GameScore
  query
  results
  scores = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public sp: ServiceProvider, public toastCtrl: ToastController) {
    this.GameScore = Parse.Object.extend("GameScore");
    this.query = new Parse.Query(this.GameScore);
    this.query.limit(100);
    this.initial_query();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  refresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
    this.initial_query();
  }

  async initial_query() {

    await this.query.find().then(
      results => {
        this.scores = []
        for (let i = 0; i < results.length; i++) {
          let object = results[i];
          isUndefined
          this.scores.push(object);
        }
      }
    )
  }

  detail(score){
    console.log('detail')
    this.navCtrl.push('DetailPage', { score: score})
  }

  create(){
    this.navCtrl.push('CreatePage')
  }

  logOut(){
    Parse.User.logOut().then((resp) => {
      console.log('Logged out successfully', resp);

      this.navCtrl.setRoot('LoginPage');
    }, err => {
      console.log('Error logging out', err);

      this.toastCtrl.create({
        message: 'Error logging out',
        duration: 2000
      }).present();
    })
  }
}
