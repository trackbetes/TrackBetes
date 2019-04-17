import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CholesterolChartPage } from './cholesterol-chart';

@NgModule({
  declarations: [
    CholesterolChartPage,
  ],
  imports: [
    IonicPageModule.forChild(CholesterolChartPage),
  ],
})
export class CholesterolChartPageModule {}
