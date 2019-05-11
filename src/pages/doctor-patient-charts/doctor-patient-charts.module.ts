import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorPatientChartsPage } from './doctor-patient-charts';

@NgModule({
  declarations: [
    DoctorPatientChartsPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorPatientChartsPage),
  ],
})
export class DoctorPatientChartsPageModule {}
