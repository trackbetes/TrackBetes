import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientAppointmentsPage } from './patient-appointments';

@NgModule({
  declarations: [
    PatientAppointmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientAppointmentsPage),
  ],
})
export class PatientAppointmentsPageModule {}
