import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditDoctorPrescriptionPage } from './edit-doctor-prescription';

@NgModule({
  declarations: [
    EditDoctorPrescriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(EditDoctorPrescriptionPage),
  ],
})
export class EditDoctorPrescriptionPageModule {}
