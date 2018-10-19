import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the CompanyDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-detail',
  templateUrl: 'company-detail.html',
})
export class CompanyDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public sp: ServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyDetailPage');
  }

}
