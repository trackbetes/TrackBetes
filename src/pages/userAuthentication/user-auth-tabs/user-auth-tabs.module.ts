import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserAuthTabsPage } from './user-auth-tabs';

@NgModule({
  declarations: [
    UserAuthTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserAuthTabsPage),
  ],
})
export class UserAuthTabsPageModule {}
