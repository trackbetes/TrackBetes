import { TabsPage } from './../../tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, ModalController, Events, ItemSliding, ViewController, LoadingController } from 'ionic-angular';
import { MedicalRecord } from '../../../../models/MedicalRecord';
import {  AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DashboardPage } from '../../dashboard/dashboard';
import { EditBloodSugarLevelPage } from '../edit-blood-sugar-level/edit-blood-sugar-level';

@IonicPage()
@Component({
  selector: 'page-blood-sugar-level',
  templateUrl: 'blood-sugar-level.html',
})
export class BloodSugarLevelPage {

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
    type: this.MEDICALRECORDTYPE.bloodSugar,
    date: this.customDate.day + '-' + this.customDate.month + '-' + this.customDate.year,
    time: this.customTime.hour + '-' + this.customTime.min + '-' + this.customTime.ampm,
    comments:'',
    patientId:'',
    
  } as MedicalRecord;

  
  testType = {
    type1: 'fasting',
    type2: 'non fasting',
  };

  selectedTestType: string = this.testType.type1;

  //creates a reference variable which consists of an array 
  medicalrecordRef$: FirebaseListObservable<MedicalRecord[]>

  addedRecords = [];

  messages = {
    emptyFields:'You forgot to fill one or more fields, please check and try again',
    addedEntry:'New records have been added successfully',
    noAddedRecord:'You have not added any record, do u still want to leave ?',
    savingRecords:'Saving your records, please wait...'
    
  }

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public toastCtlr: ToastController,
     private alertCtlr: AlertController,
     private modalCtlr: ModalController,
     private afdb: AngularFireDatabase,
     private afAuth:AngularFireAuth,
     public event: Events,
     private viewCtlr: ViewController,
     public loadingCtlr: LoadingController) {

      
      //gets id of current user
      this.afAuth.authState.subscribe((auth) => {
        this.medicalRecord.patientId = auth.uid;
      });

      
    
  }


  setConcentrationLabel(event) {
    if (event == 'mmol/L')
      this.concentrationLabel = 'Molar';
    else 
      this.concentrationLabel = 'Mass';
  }


  //convert concentration values to mmol/L (mmol/L = 18 * mg/dL)
  convertConcentrationValue() {
        
    if (this.concentrationUnit === this.concentrationUnitType.molar){
      return Number(this.medicalRecord.value);
      
    }
    if (this.concentrationUnit === this.concentrationUnitType.mass) {
      return  Number(((this.medicalRecord.value) * 18).toFixed());
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

  setTestType(event) {
    if(event == this.testType.type1) {
      this.selectedTestType =  this.testType.type1;
    }else {
      this.selectedTestType =  this.testType.type2;
    }
  }

  addRecord() {
    let toast = this.toastFunc();
    let alert = this.alertFunc();

    if(this.validatedInputs()) {
       
      //create record object 
      let record = {
        value:this.convertConcentrationValue(),
        date:this.medicalRecord.date,
        time:this.medicalRecord.time,
        testType:this.selectedTestType,
        comments:this.medicalRecord.comments,
        patientId:this.medicalRecord.patientId,
      }
      //adds record to records array
      this.addedRecords.push(record);

      this.medicalRecord = {
        value: 0,
        type: '',
        date: '',
        time: '',
        comments:'',
        patientId:this.medicalRecord.patientId, 
      }
    }
  }

  editAddedRecord(record: MedicalRecord, slidingItem: ItemSliding) {
    
    let modal = this.modalFunc(EditBloodSugarLevelPage, {'record': record});
    modal.present();
    slidingItem.close();
  }

  deleteAddedRecord(record, slidingItem: ItemSliding) {
    let alert = this.alertFunc();
    alert.setMessage('Are you sure, delete ' + record.value + " ?");
    alert.addButton(
      {
        text:'Yes',
        handler:()=> {
          let index = this.addedRecords.indexOf(record);
          if (index > -1)
            this.addedRecords.splice(index, 1);
        }
      }
    );
    alert.addButton(
      {
        text:'No',
        handler: ()=> {
          return;
        } 
      }
    );
    
    alert.present();
    slidingItem.close();
  }

  saveRecord(){
    let savedRecordToAfdb = false;
    let alert = this.alertFunc();
    let loading = this.loadingFunc();
    loading.setSpinner('ios');
    loading.setContent(this.messages.savingRecords);
    if(this.addedRecords.length <= 0) {
      
      alert.setMessage(this.messages.noAddedRecord);
      alert.addButton({
        text:'yes',
        handler: () => {
          this.viewCtlr.dismiss();
        }
      });
      alert.addButton({
        text:'No',
        handler: () => {
          return;
        }
      })
      alert.present();
    }else {
      let toast = this.toastFunc();
      let index = 0;
      let count = 0;
      loading.present();
      
      for(index; index < this.addedRecords.length; index++) {
         //adds medical record to list of records in firebase database
         this.getMedicalRecordsRef(this.addedRecords[index].testType).push({
          value:this.addedRecords[index].value,
          date:this.addedRecords[index].date,
          time:this.addedRecords[index].time,
          testType:this.addedRecords[index].testType,
          comments:this.addedRecords[index].comments,
          patientId:this.addedRecords[index].patientId,
        }).then((index)=>{
          count++;
          if(count === this.addedRecords.length) {
            savedRecordToAfdb = true;
            loading.dismiss();
            toast.setMessage(this.messages.addedEntry);
            toast.setDuration(2000);
            toast.setPosition('top');
            toast.present();
            this.viewCtlr.dismiss();
          }
        }).catch((error)=> {
          alert.setMessage(error.message);
        })
      }
      
    }
    
  }

  getMedicalRecordsRef(params) {
    //creates a node in firebase which holds list of medical records
    return this.afdb.list(`medicalRecords/${this.medicalRecord.patientId}/${this.MEDICALRECORDTYPE.bloodSugar}/${params}`);
     
  }


  validatedInputs(): boolean{
    let toast = this.toastFunc();
    if (!this.medicalRecord.value ||
        this.medicalRecord.value < 0 ||
        this.medicalRecord.date == '--' ||
        this.medicalRecord.time == '--'){
        toast.setMessage(this.messages.emptyFields);
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

  alertFunc() {
    return this.alertCtlr.create();
    
  }

  modalFunc(page, args?) {
    return this.modalCtlr.create(page, args);
  }

  loadingFunc() {
    return this.loadingCtlr.create();
  }

  


  

  

}
