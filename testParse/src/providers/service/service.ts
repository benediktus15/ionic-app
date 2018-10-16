import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Parse } from 'parse';

@Injectable()
export class ServiceProvider {

  private appId: string = 'DkVNfJAZa1Y1xG1jKGm4sIH8edy4IuBhTFm8xTMf';
  private serverURL: string = 'https://parseapi.back4app.com/';
  private jsKey: string = 'dJ5C9IleUHepmW4xMXmaiBkw8iXjQqrmvoM95aT6';

  constructor() {
    console.log('Hello ServiceProvider Provider');
    this.parseInitialize();
  }

  // Service //
  parseInitialize() {
    Parse.initialize(this.appId, this.jsKey);
    Parse.serverURL = this.serverURL;
  }

  // GetAllScores //
  getGameScores(offset: number = 0, limit: number = 3): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const GameScore = Parse.Object.extend("GameScore");
        let query = new Parse.Query(GameScore);
        query.skip(offset);
        query.limit(limit);
        query.find().then(function (gameScores) {
          resolve(gameScores);
        }, (error) => {
          reject(error);
        });
      }, 500);
    });
  }

  // AddGameScore //
  addGameScore(newScore): Promise<any> {
    const GameScore = Parse.Object.extend("GameScore");
    let gameScore = new GameScore();

    gameScore.set("score", parseInt(newScore.score));
    gameScore.set("playerName", newScore.playerName);
    gameScore.set("cheatMode", false);

    // gameScore.set("score", 1337);
    // gameScore.set("playerName", "Sean Plott");
    // gameScore.set("cheatMode", false);

    return gameScore.save(null, {
      success: function (gameScore) {
        console.log(gameScore);
        return gameScore;
      },
      error: function (gameScore, error) {
        console.log(error);
        return error;
      }
    });
  }

  // GetAllCompany //
  getCompany(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const Company = Parse.Object.extend("Company");
        let query = new Parse.Query(Company);
        query.find().then(function (company) {
          resolve(company);
        }, (error) => {
          reject(error);
        });
      }, 500);
    });
  }

  // GetAllUser //
  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const User = Parse.Object.extend("User");
        let query = new Parse.Query(User);
        query.find().then(function (user) {
          resolve(user);
        }, (error) => {
          reject(error);
        });
      }, 500);
    });
  }

  // AddGameScore //
  addUser(newUser): Promise<any> {
    const User = Parse.Object.extend("User");
    let user = new User();

    user.set("username", newUser.username);
    user.set("email", newUser.email);
    user.set("company", newUser.company);
    user.set("password", newUser.password);

    return user.save(null, {
      success: function (user) {
        console.log(user);
        return user;
      },
      error: function (user, error) {
        console.log(error);
        return error;
      }
    });
  }

  // UpdateUser
  updateUser() {
    var User = Parse.Object.extend("User");
    var user = new User();

    user.set("username", user.username);
    user.set("email", user.email);
    user.set("company", user.company);
    user.set("password", user.password);

    User.save().then((user) => {
      user.set("username", user.username);
      user.set("email", user.email);
      user.set("company", user.company);
      user.set("password", user.password);

      return user.save();
    });
  }

  // LogOut //
  logOut() {
    Parse.User.logOut()
  }

  // LogIn //
  login(username, password) {

    return new Observable((observer) => {

      Parse.User.logIn(username, password, {

        success: (user) => {
          observer.next(user);
          observer.complete();
        },
        error: (user, error) => {

          observer.error(error);
          observer.complete();

        }

      })
    })
  }

  // SignUp //
  public signUp(username: string, password: string, email: string): Observable<boolean> {
    return new Observable((observer) => {
      var user = new Parse.User();
      user.set('username', username);
      user.set('password', password);
      user.set('email', email);

      user.signUp(null, {
        success: (user) => {
          observer.next(true);
          observer.complete();
        },
        error: (user, error) => {
          observer.error(error);
          observer.complete();
        }
      });

    });
  }

}
