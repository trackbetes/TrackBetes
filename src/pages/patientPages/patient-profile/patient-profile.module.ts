import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientProfilePage } from './patient-profile';

@NgModule({
  declarations: [
    PatientProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(PatientProfilePage),
  ],
})
export class PatientProfilePageModule {}
