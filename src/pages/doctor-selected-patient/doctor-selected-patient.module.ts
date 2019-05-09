import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorSelectedPatientPage } from './doctor-selected-patient';

@NgModule({
  declarations: [
    DoctorSelectedPatientPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorSelectedPatientPage),
  ],
})
export class DoctorSelectedPatientPageModule {}
