import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  public current_user;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sp:ServiceProvider, public formBuilder: FormBuilder, public alertCtlr:AlertController, public loadingCtrl: LoadingController) {
    this.current_user = {
      playerName: this.sp.score.get('playerName'),
      score: this.sp.score.get('score'),
    }

    console.log('Error', JSON.stringify(this.current_user))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  update(){
    console.log('save')
    let loader = this.loadingCtrl.create({content: 'Saving data...'});
    loader.present();
    console.log('saving ... '+JSON.stringify(this.current_user))
    this.sp.score.save(this.current_user).then(r=>{
      loader.dismissAll();
      this.navCtrl.setRoot('HomePage')
    }).catch((error)=>{
      console.log('Error: '+JSON.stringify(error))
      loader.dismissAll();
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
