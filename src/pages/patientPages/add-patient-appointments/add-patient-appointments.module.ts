import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPatientAppointmentsPage } from './add-patient-appointments';

@NgModule({
  declarations: [
    AddPatientAppointmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPatientAppointmentsPage),
  ],
})
export class AddPatientAppointmentsPageModule {}
