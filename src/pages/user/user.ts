import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { isUndefined } from 'util';
import Parse from 'parse';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  User
  users = [];
  query

  constructor(public navCtrl: NavController, public navParams: NavParams, public sp: ServiceProvider, public alertCtlr: AlertController) {
    this.User = Parse.Object.extend("User");
    this.query = new Parse.Query(this.User);
    this.listUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }
  refresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
    this.listUser();
  }

  // GetAllUser //
  // listUser(): Promise<any> {
  //   return this.sp.getUser().then(
  //     (result) => {
  //       for (let i = 0; i < result.length; i++) {
  //         let object = result[i];
  //         this.users.push(object);
  //         console.log(result[i])
  //         // console.log('user:'+JSON.stringify(result));
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  listUser() {

    this.query.find().then(
      results => {
        this.users = []
        for (let i = 0; i < results.length; i++) {
          let object = results[i];
          isUndefined
          this.users.push(object);
        }
      }
    )
  }

  detail(user) {
    this.navCtrl.push('UserDetailPage', { user: user });
  }

  delete(user) {
    const alert = this.alertCtlr.create({
      title: 'Confirm',
      message: 'Apakah anda ingin menghapusnya',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          handler: () => {
            console.log('Cancel')
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.query.get(user.id)
              .then((myObject) => {
                myObject.destroy();
                let i = this.users.indexOf(user);

                this.users.splice(i, 1);
              })
          }
        }
      ]
    })
    alert.present();
  }
}
