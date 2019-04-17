import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorsListPage } from './doctors-list';

@NgModule({
  declarations: [
    DoctorsListPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorsListPage),
  ],
})
export class DoctorsListPageModule {}
