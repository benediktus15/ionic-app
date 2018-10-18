import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  private current_user;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sp: ServiceProvider, public alertCtlr: AlertController, public loadingCtrl: LoadingController) {
    this.current_user = {
      Image: this.sp.score.get('Image'),
      playerName: this.sp.score.get('playerName'),
      score: this.sp.score.get('score'),
    }
    console.log(this.current_user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  save(){
    console.log('save')
    let loader = this.loadingCtrl.create({content: 'Saving data...'});
    loader.present();
    console.log('saving ... '+JSON.stringify(this.current_user))
    this.sp.score.save(this.current_user).then(r=>{
      loader.dismissAll();
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
