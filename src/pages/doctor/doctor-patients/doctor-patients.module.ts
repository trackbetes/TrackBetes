import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorPatientsPage } from './doctor-patients';

@NgModule({
  declarations: [
    DoctorPatientsPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorPatientsPage),
  ],
})
export class DoctorPatientsPageModule {}
