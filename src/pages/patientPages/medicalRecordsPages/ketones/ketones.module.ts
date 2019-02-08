import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KetonesPage } from './ketones';

@NgModule({
  declarations: [
    KetonesPage,
  ],
  imports: [
    IonicPageModule.forChild(KetonesPage),
  ],
})
export class KetonesPageModule {}
