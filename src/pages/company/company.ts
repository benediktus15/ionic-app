import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

import Parse from 'parse';

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

  Company
  q
  companys = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public sp: ServiceProvider, public alertCtlr: AlertController) {
    this.Company = Parse.Object.extend('Company');
    this.q = new Parse.Query(this.Company);
    this.listCompany();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyPage');
  }

  listCompany(){
    this.q.find().then(result => {
      this.companys = []
      for (let i = 0; i < result.length; i++) {
        let object = result[i];
        
        this.companys.push(object);
      }
    })
  }

  delete(company){
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
            this.q.get(company.id)
              .then((myObject) => {
                myObject.destroy();
                let i = this.Company.indexOf(company);

                this.Company.splice(i, 1);
              })
          }
        }
      ]
    })
    alert.present();
  }
  
}
