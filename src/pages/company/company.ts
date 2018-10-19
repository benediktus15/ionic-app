import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the CompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company',
  templateUrl: 'company.html',
})
export class CompanyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public sp: ServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyPage');
  }

  ionViewWillEnter(){
    this.sp.getCompany();
  }

  companyDetail(i){
    this.sp.getUsers(i);
    this.navCtrl.push('CompanyMemberPage')
  }

}
