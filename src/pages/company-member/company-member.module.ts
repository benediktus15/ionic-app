import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyMemberPage } from './company-member';

@NgModule({
  declarations: [
    CompanyMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyMemberPage),
  ],
})
export class CompanyMemberPageModule {}
