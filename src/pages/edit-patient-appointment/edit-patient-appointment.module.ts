import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPatientAppointmentPage } from './edit-patient-appointment';

@NgModule({
  declarations: [
    EditPatientAppointmentPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPatientAppointmentPage),
  ],
})
export class EditPatientAppointmentPageModule {}
