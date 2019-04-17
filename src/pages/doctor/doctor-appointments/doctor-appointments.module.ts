import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorAppointmentsPage } from './doctor-appointments';

@NgModule({
  declarations: [
    DoctorAppointmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorAppointmentsPage),
  ],
})
export class DoctorAppointmentsPageModule {}
