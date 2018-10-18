import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, App } from 'ionic-angular';
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

  result: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sp: ServiceProvider, public toastCtrl: ToastController, public alertCtlr: AlertController, public app: App) {
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
    this.GameScore = Parse.Object.extend("GameScore");
    this.query = new Parse.Query(this.GameScore);

    this.query.limit(100);

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

      // getCompaniesNews(): Observable<any[]>{
      //   return new Observable((observer)=>{
      //     console.log('getCompaniesNews');
      //     var company=this.loginProvider.anggota.get('company');
      //     var q = new Parse.Query('News');
      //     q.equalTo('company',company);
      //     q.equalTo('statusid',100);
      //     q.limit(20);
      //     q.descending('updatedAt');
      //     q.find().then((results)=>{
      //       var l=[];
      //       for(var i=0;i<results.length;i++){
      //         l.push({
      //           id : results[i].get('objectId'),
      //           title : results[i].get('title'),
      //           imageurl : results[i].get('imageurl'),
      //           content : results[i].get('content'),
      //         });
      //       }
      //       observer.next(l);
      //       observer.complete();
      //     })
      //   })
      // }

  detail(score){
    this.navCtrl.push('DetailPage', { score: score})
  }

  edit(key){
      this.navCtrl.push('EditPage', {score: key});
  }

  create(){
    this.navCtrl.push('CreatePage')
  }

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

  logOut(){
    Parse.User.logOut().then((resp) => {
      console.log('Logged out successfully', resp);

      // this.navCtrl.setRoot('LoginPage');
      this.app.getRootNav().setRoot('LoginPage');
    }, err => {
      console.log('Error logging out', err);

      this.toastCtrl.create({
        message: 'Error logging out',
        duration: 2000
      }).present();
    })
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
