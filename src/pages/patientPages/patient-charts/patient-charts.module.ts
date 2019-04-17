import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientChartsPage } from './patient-charts';

@NgModule({
  declarations: [
    PatientChartsPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientChartsPage),
  ],
})
export class PatientChartsPageModule {}
