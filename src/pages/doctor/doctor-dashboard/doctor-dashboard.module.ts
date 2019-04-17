import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorDashboardPage } from './doctor-dashboard';

@NgModule({
  declarations: [
    DoctorDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorDashboardPage),
  ],
})
export class DoctorDashboardPageModule {}
