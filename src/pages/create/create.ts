import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  infoForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sp: ServiceProvider, private formBuilder: FormBuilder, public alertCtlr: AlertController) {
    this.infoForm = this.formBuilder.group({
      'playerName': [null, Validators.required],
      'score': [null, Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
  }

  create() {
    this.sp.gameScore.set('score', this.infoForm.value.score);
    this.sp.gameScore.set('playerName', this.infoForm.value.playerName);

    this.sp.gameScore.save()
      .then((gameScore) => {
        // Execute any logic that should take place after the object is saved.
        // alert('New object created with objectId: ' + gameScore.id);

        this.presentAlert("success!", "New object created with objectId: ", gameScore.id);
        this.navCtrl.setRoot('HomePage');
      }, (error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        this.presentAlert("Error: ", error.code, error.message)
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
