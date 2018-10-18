import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

import Parse from 'parse';
import { isUndefined } from 'ionic-angular/umd/util/util';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  id
  score
  playerName
  imageUrl

  // data

  constructor(public navCtrl: NavController, public navParams: NavParams, public sp: ServiceProvider, public alertCtlr: AlertController) {

    // this.data=navParams.get('score');
    // var d = this.data.toJSON();
    // this.data = {
    //   playerName: d.playerName,
    //   score: d.score,
    // }

    this.initial_query(this.navParams.get('key'));
    // this.id = this.navParams.get(this.score)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  initial_query(key) {
    var GameScore = Parse.Object.extend("GameScore");
    var query = new Parse.Query(GameScore);
    query.get(key)
      .then((gameScore) => {
        // The object was retrieved successfully.
        this.score = gameScore.get("score");
        this.playerName = gameScore.get("playerName");
        this.id = gameScore.id;

      }, (error) => {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        
        // this.presentAlert("Error:", error.code, error.message)
      });

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
