import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorMessagesPage } from './doctor-messages';

@NgModule({
  declarations: [
    DoctorMessagesPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorMessagesPage),
  ],
})
export class DoctorMessagesPageModule {}
