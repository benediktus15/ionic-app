import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the CompanyMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-member',
  templateUrl: 'company-member.html',
})
export class CompanyMemberPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public sp: ServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyMemberPage');
  }

  ionViewWillEnter(){
    // this.sp.companyMember();
    // console.log(this.sp.members)

    // console.log("Error...", JSON.stringify(this.sp.members))
  }

}
