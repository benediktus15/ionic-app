import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import { Parse } from 'parse';

@Injectable()
export class ServiceProvider {

  private appId: string = 'DkVNfJAZa1Y1xG1jKGm4sIH8edy4IuBhTFm8xTMf';
  private serverURL: string = 'https://parseapi.back4app.com/';
  private jsKey: string = 'dJ5C9IleUHepmW4xMXmaiBkw8iXjQqrmvoM95aT6';
  private masterKey: string = 'UXitGIiiuH680W6CbsH6i8wLvz0qZCyAWfmx8wDB';

  public GameScore;
  public query;
  public scores = [];
  public score;

  public User;
  public users

  public player;

  public gameScore;

  constructor() {
    console.log('Hello ServiceProvider Provider');
    this.parseInitialize();
  }

  getList() {
    var query = new Parse.Query('GameScore');
    query.limit(20);
    return query.find();
  }

  // get data class GameScore
  async getGameScore() {
    this.GameScore = Parse.Object.extend("GameScore");
    this.query = new Parse.Query(this.GameScore);

    this.query.limit(100);

    await this.query.find().then(
      results => {
        this.scores = []
        for (let i = 0; i < results.length; i++) {
          let object = results[i];
          this.scores.push(object);
        }
      }
    )
  }

  // get data class GameScore
  async getUsers(company) {
    const User = Parse.Object.extend("User");
    let query = new Parse.Query(User);
    query.equalTo('company', company);
    query.include('Company');
    query.ascending('username');
    this.users = await query.find();
  }

  public company;
  public companys;

  async getCompany(){
    const Company = Parse.Object.extend("Company");
    let query = new Parse.Query(Company);

    query.ascending('username');
    this.companys = await query.find();
  }

  public members;
  async companyMember(){
    var company = new Parse.Object("Company");
    // company.set("objcetId", Parse.User.current());
    // company.equalTo("objectId", Parse.User.current())
    // company.limit(1);

    // var RS = await company.find();
    this.members = company.get('objectId');
    // this.members = await q.find();
  }

  // delete(score) {
  //   this.query.get(score.id)
  //     .then((myObject) => {
  //       myObject.destroy();
  //       let i = this.scores.indexOf(score);

  //       this.scores.splice(i, 1);
  //     }, (error) => {
  //       // The delete failed.
  //       // error is a Parse.Error with an error code and message.
  //     });
  // }

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

  newPlayer() {
    const GamePlayer = Parse.Object.extend("GamePlayer");
    this.player = new GamePlayer();
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      Parse.User.logIn(username, password).then((user) => {
        console.log('user:' + JSON.stringify(user));
      })
    })
  }

  create() {
    const GameScore = Parse.Object.extend('GameScore');
    this.gameScore = new GameScore();
  }

  logOut() {
    Parse.User.logOut();
  }

  // Service //
  parseInitialize() {
    Parse.initialize(this.appId, this.jsKey, this.masterKey);
    Parse.serverURL = this.serverURL;
  }
}
