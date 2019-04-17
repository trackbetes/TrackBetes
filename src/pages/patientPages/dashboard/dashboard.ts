import { PatientChartsPage } from './../patient-charts/patient-charts';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Events } from 'ionic-angular';
import { MedicalRecordsModalPage } from '../medical-records-modal/medical-records-modal';
import * as moment from 'moment';
import { MedicalRecord } from '../../../models/MedicalRecord';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  styles: [`
    chart {
        display: block;
        width: auto;
    }
`]
})
export class DashboardPage {
    @ViewChild('barCanvas') barCanvas;

    currentUserId:any;

    bloodSugarRecordsRef$ : FirebaseListObservable<MedicalRecord[]>;

    bloodSugarRecords = [];

    chartOptions : any;

    barChart: any;

    medicalRecordsType = {
        bsFasting:'Blood Sugar/fasting',
        bsNonFasting:'Blood Sugar/non fasting',
        bloodPressure:'Blood Pressure',
    }

    selectedMedicalRecordsType = this.medicalRecordsType.bsFasting;

    bloodSugarTestType = {
        type1: 'fasting',
        type2: 'non fasting',
    }

    
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams, 
     private modalCtlr: ModalController,
     private loadingCtlr: LoadingController,
     private afdb: AngularFireDatabase,
     private afAuth:AngularFireAuth,) {      
    
  }

    medicalRecordsModal() {
    
        let modal = this.modalCtlr.create(MedicalRecordsModalPage);
        modal.present();

    }

    changeMedicalRecordsChart($event) {
        this.showMedicalRecordsChart();
    }

    ionViewDidLoad(){
        this.showMedicalRecordsChart();
    }

    loadingFunc(){
        return this.loadingCtlr.create();
    }

    showMedicalRecordsChart() {
        let loading = this.loadingFunc();
        loading.setContent('Loading...');
        loading.setSpinner('ios');
        loading.present();

        //gets id of current user
        this.afAuth.authState.subscribe((auth) => {
            this.currentUserId = auth.uid;

            this.bloodSugarRecordsRef$ =  this.afdb.list(`medicalRecords/${this.currentUserId}/${this.selectedMedicalRecordsType}`);
            this.bloodSugarRecordsRef$.subscribe((data)=> {
                this.bloodSugarRecords = [];
                data.forEach((item)=> {
                    this.bloodSugarRecords.push(item);
                });
                loading.dismiss();
                this.medicalRecordsChart();
            });
        });
    }

    medicalRecordsChart() {
        
            //populates the data property of the chart with data from firebase
            let data = [];
            this.bloodSugarRecords.forEach((item) => {
                data.push(
                    [moment(item.date).valueOf(), item.value]
                )
            });

            
        
            this.chartOptions =  {
                chart: {
                    type: 'spline',
                    backgroundColor: '#ccc',
                },
                title: {
                    text: 'Medical Records'
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        hour: '%A, %b %e, %H:%M',
                    },
                },
                yAxis: {
                    title: {
                        text: 'Values'
                    },
                    min: 0
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
                },

                plotOptions: {
                    spline: {
                        marker: {
                            enabled: true
                        }
                    }
                },

                colors: ['#6CF', '#39F', '#06C', '#036', '#000'],

                // Define the data points. All series have a dummy year
                // of 1970/71 in order to be compared on the same x axis. Note
                // that in JavaScript, months start at 0 for January, 1 for February etc.
                series: [{
                    name: "Blood Sugar Level",
                    data: data,
                    zones: [{
                        value: 50,
                        color: 'black'
                    },{
                        value: 125,
                        color: 'green'
                    }, {
                        value: 200,
                        color: 'yellow'
                    },{
                        color: 'red'
                    }]
                }]
            };

            this.chartOptions.series[0].name = this.selectedMedicalRecordsType;
    }

    openChartsPage() {
        this.navCtrl.push(PatientChartsPage);
    }

   

    

    
    

}
