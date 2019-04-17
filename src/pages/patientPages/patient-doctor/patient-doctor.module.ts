import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientDoctorPage } from './patient-doctor';

@NgModule({
  declarations: [
    PatientDoctorPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientDoctorPage),
  ],
})
export class PatientDoctorPageModule {}
