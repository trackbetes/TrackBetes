import { Patient } from './../../../models/Pateint';
import { PatientChartsPage } from './../patient-charts/patient-charts';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { MedicalRecordsModalPage } from '../medical-records-modal/medical-records-modal';
import * as moment from 'moment';
import { MedicalRecord } from '../../../models/MedicalRecord';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { PatientProfilePage } from '../patient-profile/patient-profile';
import { Appointment } from '../../../models/Appointment';
import { PatientAppointmentsPage } from '../patient-appointments/patient-appointments';
import { AddPatientAppointmentsPage } from '../add-patient-appointments/add-patient-appointments';


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

    patient = {} as Patient;

    bloodSugarRecordsRef$ : FirebaseListObservable<MedicalRecord[]>;

    bloodSugarRecords = [];

    appointmentsRef$ : FirebaseListObservable<Appointment[]>; 

    appointments = [];

    chartOptions : any;

    barChart: any;

    userHasMedicalRecords: boolean = false;

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

    modal:any;

    
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

            //get patient's data
            this.afdb.object(`patients/${this.currentUserId}`).subscribe((patient) => {
                this.patient = patient;
            })

            //get patient's appointments
            this.afdb.list(`appointments/${this.currentUserId}`, {
                query: {
                    limitToLast : 3
                }
            }).subscribe((appointments) => {
                this.appointments = [];

                //push appointments into appointments array in desc order
                for (let index = appointments.length -1; index >= 0; index--) {
                    this.appointments.push(appointments[index]); 
                }
            })
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
            if(data.length > 0) {
                this.userHasMedicalRecords = true;
            }else{
                this.userHasMedicalRecords = false;
            }

            
        
            this.chartOptions =  {
                chart: {
                    type: 'column',
                    backgroundColor: 'white',
                },
                credits: {
                    enabled: false
                },

                title: {
                    text: '',
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        hour: '%b. %y',
                    },
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    },
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x:%e %b, %Y}: {point.y:.2f} m'
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
                }],
            };

            this.chartOptions.series[0].name = this.selectedMedicalRecordsType;
    }

    openChartsPage() {
        this.navCtrl.push(PatientChartsPage);
    }

    openProfilePage() {
        this.modal = this.modalFunc(PatientProfilePage);
        this.modal.present();
    }

    openAppointmentsPage() {
        this.navCtrl.push(PatientAppointmentsPage);
    }

    openAddAppointmentsModal() {
        
        this.modal = this.modalFunc(AddPatientAppointmentsPage);
        this.modal.present();
    }

    modalFunc(modalPage) {
        return this.modalCtlr.create(modalPage);
    }

   

    

    
    

}
