import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public sp: ServiceProvider) {

    // this.initial_query(this.navParams.get('key'));
    this.id = this.navParams.get(this.score)
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

        if (!isUndefined(  gameScore.get("Image")))
        this.imageUrl = gameScore.get("Image").url();
        else
        this.imageUrl = gameScore.get("avatar");

      }, (error) => {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
      });

  }

}
