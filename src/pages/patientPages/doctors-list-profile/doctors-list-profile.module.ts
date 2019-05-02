import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorsListProfilePage } from './doctors-list-profile';

@NgModule({
  declarations: [
    DoctorsListProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorsListProfilePage),
  ],
})
export class DoctorsListProfilePageModule {}
