import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import Parse from 'parse';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  company = [];

  user = [];
  newUser = { username: null, email: null, company: null, password: null };

  newScore = { playerName: null, score: null };
  gameScores = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public sp: ServiceProvider, public toastCtrl: ToastController) {
    this.listScores();
    this.listCompany();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  logOut() {
    // this.sp.logOut();
    // this.navCtrl.push('LoginPage')
    // this.navCtrl.setRoot('LoginPage');

    Parse.User.logOut().then((resp) => {
      console.log('Logged out successfully', resp);

      this.navCtrl.setRoot('LoginPage');
    }, err => {
      console.log('Error logging out', err);

      this.toastCtrl.create({
        message: 'Error logging out',
        duration: 2000
      }).present();
    })
  }

  // GetAllScores //
  listScores(): Promise<any> {
    let offset = this.gameScores.length;
    let limit = 10;
    return this.sp.getGameScores(offset, limit).then(
      (result) => {
        for (let i = 0; i < result.length; i++) {
          let object = result[i];
          this.gameScores.push(object);
          // console.log(result)
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // AddGameScore //
  postGameScore() {
    this.sp.addGameScore(this.newScore).then(
      (gameScore) => {
        this.gameScores.push(gameScore);
        this.newScore.playerName = null;
        this.newScore.score = null;
        alert("Score added.");
      },
      (error) => {
        console.log(error);
        console.log("Error adding score.");
        // alert("Error adding score.");
      }
    );
  }

  // GetAllCompany //
  listCompany(): Promise<any> {
    return this.sp.getCompany().then(
      (result) => {
        for (let i = 0; i < result.length; i++) {
          let object = result[i];
          this.company.push(object);
          // console.log(result)
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // AddUser //
  addUser() {
    this.sp.addUser(this.newUser).then(
      (newUsers) => {
        this.user.push(newUsers);
        this.newUser.username = null;
        this.newUser.email = null;
        this.newUser.company = null;
        this.newUser.password = null;
        alert("User added.");
      },
      (error) => {
        console.log(error);
        console.log("Error adding users.");
      }
    );
  }

  allUser(){
    this.navCtrl.push('UserPage');
  }

  // Example //
  // getCompaniesNews(): Observable<any[]>{
  //   return new Observable((observer)=>{
  //     console.log('getCompaniesNews');
  //     var company=this.sp.anggota.get('company');
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

}
