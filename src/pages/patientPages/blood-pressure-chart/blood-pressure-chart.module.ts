import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BloodPressureChartPage } from './blood-pressure-chart';

@NgModule({
  declarations: [
    BloodPressureChartPage,
  ],
  imports: [
    IonicPageModule.forChild(BloodPressureChartPage),
  ],
})
export class BloodPressureChartPageModule {}
