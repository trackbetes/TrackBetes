import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDoctorPrescriptionsPage } from './add-doctor-prescriptions';

@NgModule({
  declarations: [
    AddDoctorPrescriptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddDoctorPrescriptionsPage),
  ],
})
export class AddDoctorPrescriptionsPageModule {}
