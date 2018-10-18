import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Parse from 'parse';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  editForm: FormGroup;
  score
  playerName
  id
  gameScore

  constructor(public navCtrl: NavController, public navParams: NavParams, public sp:ServiceProvider, public formBuilder: FormBuilder, public alertCtlr:AlertController) {
    this.editForm = this.formBuilder.group({
      'player_name': [null, Validators.required],
      'player_score': [null, Validators.required]
    }); 
    
    // this.initial_query(this.editForm = navParams.get("key"));
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  initial_query(key) {
    var GameScore = Parse.Object.extend("GameScore");
    var query = new Parse.Query(GameScore);
    query.get(key)
      .then((gameScore) => {
        // The object was retrieved successfully.
        this.editForm.controls['player_name'].setValue(gameScore.get("playerName"));
        this.editForm.controls['player_score'].setValue(gameScore.get("score"));
        this.id = gameScore.id;
        this.gameScore = gameScore;
      }, (error) => {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        this.presentAlert("Error:", error.code, error.message);
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
