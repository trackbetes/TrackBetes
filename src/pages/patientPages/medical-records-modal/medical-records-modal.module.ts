import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicalRecordsModalPage } from './medical-records-modal';

@NgModule({
  declarations: [
    MedicalRecordsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicalRecordsModalPage),
  ],
})
export class MedicalRecordsModalPageModule {}
