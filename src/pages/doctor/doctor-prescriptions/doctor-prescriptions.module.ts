import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorPrescriptionsPage } from './doctor-prescriptions';

@NgModule({
  declarations: [
    DoctorPrescriptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorPrescriptionsPage),
  ],
})
export class DoctorPrescriptionsPageModule {}
