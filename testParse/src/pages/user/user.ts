import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  user = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public sp: ServiceProvider) {
    this.listUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  // GetAllUser //
  listUser(): Promise<any> {
    return this.sp.getUser().then(
      (result) => {
        for (let i = 0; i < result.length; i++) {
          let object = result[i];
          this.user.push(object);
          console.log(result[i])
          // console.log('user:'+JSON.stringify(result));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  detail(i){
    this.navCtrl.push('UserDetailPage', {i : i});
  }
}
