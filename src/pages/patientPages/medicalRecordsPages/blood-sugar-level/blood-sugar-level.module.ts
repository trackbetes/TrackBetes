import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BloodSugarLevelPage } from './blood-sugar-level';

@NgModule({
  declarations: [
    BloodSugarLevelPage,
  ],
  imports: [
    IonicPageModule.forChild(BloodSugarLevelPage),
  ],
})
export class BloodSugarLevelPageModule {}
