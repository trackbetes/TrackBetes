import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BloodSugarChartPage } from './blood-sugar-chart';

@NgModule({
  declarations: [
    BloodSugarChartPage,
  ],
  imports: [
    IonicPageModule.forChild(BloodSugarChartPage),
  ],
})
export class BloodSugarChartPageModule {}
