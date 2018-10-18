import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Parse } from 'parse';

@Injectable()
export class ServiceProvider {

  private appId: string = 'DkVNfJAZa1Y1xG1jKGm4sIH8edy4IuBhTFm8xTMf';
  private serverURL: string = 'https://parseapi.back4app.com/';
  private jsKey: string = 'dJ5C9IleUHepmW4xMXmaiBkw8iXjQqrmvoM95aT6';
  private masterKey: string = 'UXitGIiiuH680W6CbsH6i8wLvz0qZCyAWfmx8wDB';

  constructor() {
    console.log('Hello ServiceProvider Provider');
    this.parseInitialize();
  }

  // Service //
  parseInitialize() {
    Parse.initialize(this.appId, this.jsKey, this.masterKey);
    Parse.serverURL = this.serverURL;
  }
  
  getList(){
    var query = new Parse.Query('GameScore');
    query.limit(20);
    return query.find();
  }

}
