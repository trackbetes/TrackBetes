import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { MedicalRecord } from '../../../models/MedicalRecord';
import * as moment from 'moment';

/**
 * Generated class for the BloodSugarChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blood-sugar-chart',
  templateUrl: 'blood-sugar-chart.html',
  styles: [`
    chart {
        display: block;
        width: auto;
    }
`]
})
export class BloodSugarChartPage {

  bsFastingChartOptions : any;

  bsNonFastingChartOptions: any;

  currentUserId:any;

  bsFastingRecordsRef$ : FirebaseListObservable<MedicalRecord[]>;

  bsNonFastingRecordsRef$ : FirebaseListObservable<MedicalRecord[]>;

  bsFastingRecords = [];

  bsNonFastingRecords = [];

  bloodSugarType = {
    bsFasting:'Blood Sugar/fasting',
    bsNonFasting:'Blood Sugar/non fasting',
}

dismissBSFastingSpinner = false;

dismissBSNonFastingSpinner = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtlr: ViewController,
    private loadingCtlr: LoadingController,
    private afdb: AngularFireDatabase,
    private afAuth:AngularFireAuth,) {
  }

  ionViewDidLoad() {
    this.showMedicalRecordsChart();
  }

  showMedicalRecordsChart() {
    

    //gets id of current user
    this.afAuth.authState.subscribe((auth) => {
        this.currentUserId = auth.uid;

        //subscribe to bsFasting records
        this.bsFastingRecordsRef$ =  this.afdb.list(`medicalRecords/${this.currentUserId}/${this.bloodSugarType.bsFasting}`);
        this.bsFastingRecordsRef$.subscribe((data)=> {
            this.bsFastingRecords = [];
            data.forEach((item)=> {
                this.bsFastingRecords.push(item);
            });
            

            this.dismissBSFastingSpinner = true;
            //draw bsFasting chart
            this.bsFastingChart();
        });

        //subscribe to bsNonFasting records
        this.bsNonFastingRecordsRef$ =  this.afdb.list(`medicalRecords/${this.currentUserId}/${this.bloodSugarType.bsNonFasting}`);
        this.bsNonFastingRecordsRef$.subscribe((data)=> {
            this.bsNonFastingRecords = [];
            data.forEach((item)=> {
                this.bsNonFastingRecords.push(item);
            });

            this.dismissBSNonFastingSpinner = true;
            //draw bsNonFasting chart
            this.bsNonFastingChart();

        });
    });
}

bsFastingChart() {

    //populates the data property of the chart with data from firebase
    let data = [];
    this.bsFastingRecords.forEach((item) => {
        data.push(
            [moment(item.date).valueOf(), item.value]
        )
    });

    this.bsFastingChartOptions =  {
        chart: {
            type: 'spline',
            backgroundColor: '#ccc',
        },
        title: {
            text: ''
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

    this.bsFastingChartOptions.series[0].name = this.bloodSugarType.bsFasting;
}

bsNonFastingChart() {
    //populates the data property of the chart with data from firebase
    let data = [];
    this.bsNonFastingRecords.forEach((item) => {
        data.push(
            [moment(item.date).valueOf(), item.value]
        )
    });

    this.bsNonFastingChartOptions =  {
        chart: {
            type: 'spline',
            backgroundColor: '#ccc',
        },
        title: {
            text: ''
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

    this.bsNonFastingChartOptions.series[0].name = this.bloodSugarType.bsNonFasting;
}

loadingFunc(){
  return this.loadingCtlr.create();
}


  //close the modal 
  closeModal() {
    this.viewCtlr.dismiss(); 
  }

}
