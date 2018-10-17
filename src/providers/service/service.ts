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

}
