import { MedicalRecord } from './../../../../models/MedicalRecord';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

/**
 * Generated class for the EditBloodSugarLevelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-blood-sugar-level',
  templateUrl: 'edit-blood-sugar-level.html',
})
export class EditBloodSugarLevelPage {

  concentrationUnitType = {
    molar:'mmol/L',
    mass:'mg/dL',
  }

   MEDICALRECORDTYPE = {
     bloodSugar:'Blood Sugar',
   };

  concentrationUnit:string = 'mmol/L';
  category:string = '';

  //label for blood sugar concentration
  concentrationLabel:string = 'Molar';

  //current date and time constants
  currentDate: string = new Date().toISOString();
  currentTime: string = new Date().toISOString();

  customDate = {
    day:'',
    month:'',
    year:'',
  }

  customTime = {
    hour:'',
    min:'',
    ampm:'',
  }

  medicalRecord = {
    value: 0,
    date:'',
    time:'',
    testType:'',
    comments:'',

    /*type: this.MEDICALRECORDTYPE.bloodSugar,
    date: this.customDate.day + '-' + this.customDate.month + '-' + this.customDate.year,
    time: this.customTime.hour + '-' + this.customTime.min + '-' + this.customTime.ampm,
    comments:'',
    patientId:'',*/
    
  }

  
  testType = {
    type1: 'fasting',
    type2: 'non fasting',
  };

  selectedTestType: string = this.testType.type1;

  //creates a reference variable which consists of an array 
  addedRecords = [];

  updatedMedicalRecord = {} as MedicalRecord;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public viewCtlr: ViewController,
     public toastCtlr: ToastController,) {
  }

  setConcentrationLabel(event) {
    if (event == 'mmol/L')
      this.concentrationLabel = 'Molar';
    else 
      this.concentrationLabel = 'Mass';
  }

  setTestType(event) {
    if(event == this.testType.type1) {
      this.selectedTestType =  this.testType.type1;
    }else {
      this.selectedTestType =  this.testType.type2;
    }
  }

  dateChange(date) {
    this.customDate = {
      day:date.day,
      month:date.month,
      year:date.year
    }

  }

  timeChange(time) {
    this.customTime = {
      hour:time.hour,
      min:time.minute,
      ampm:time.ampm
    }
  }

  ionViewDidLoad() {
    let record = this.navParams.get('record');

    this.updatedMedicalRecord = record;
    
    this.medicalRecord = {
      value: record.value,
      date: record.date,
      time: record.time,
      testType: record.testType,
      comments: record.comments,

    }

     
  }

  saveRecord() {
    if(this.validatedInputs()) {
      this.updatedMedicalRecord.value = Number(this.medicalRecord.value);
      this.updatedMedicalRecord.date = this.medicalRecord.date;
      this.updatedMedicalRecord.time = this.medicalRecord.time;
      this.updatedMedicalRecord.comments = this.medicalRecord.comments;
      
      //closes modal
      this.viewCtlr.dismiss();
    }
    
  }

  validatedInputs(): boolean{
    let toast = this.toastFunc();
    if (!this.medicalRecord.value ||
        this.medicalRecord.value < 0 ||
        this.medicalRecord.date == '--' ||
        this.medicalRecord.time == '--'){
        toast.setMessage('You made a wrong entry or forgot to enter some details. Please check your inputs.');
        toast.setShowCloseButton(true);
        toast.present();
        return false;
      }else {
        return true;
    }
  }

  toastFunc() {
    return this.toastCtlr.create();
  }

  closeModal() {
    this.viewCtlr.dismiss();
  }

}
