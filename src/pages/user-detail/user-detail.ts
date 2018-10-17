import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage {

  public newUser;
  public data;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sp: ServiceProvider, public loadingCtlr: LoadingController) { 
    this.newUser = navParams.get('i')
    var d = this.newUser.toJSON();
    this.data = {
      username : d.username,
      email : d.email,
      company : d.company,
      password : d.password
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailPage');
  }

  save(){
    console.log('save')
    let loader = this.loadingCtlr.create({content: 'Saving data...'});
    loader.present();
    this.data.statusid = this.data.statusid * 1;
    
    this.newUser.save(this.data).then(r=>{
      loader.dismissAll();
    }).catch((error)=>{
      loader.dismissAll();
    }); 
  }

  updateData(){
    this.sp.updateUser()
  }

    // AddUser //
    // addUser() {
    //   this.sp.up(this.newUser).then(
    //     (newUsers) => {
    //       this.user.push(newUsers);
    //       this.newUser.username = null;
    //       this.newUser.email = null;
    //       this.newUser.company = null;
    //       this.newUser.password = null;
    //       alert("User added.");
    //     },
    //     (error) => {
    //       console.log(error);
    //       console.log("Error adding users.");
    //     }
    //   );
    // }

}
