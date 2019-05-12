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

chartType = {
    line:'line',
    spline:'spline',
    column:'column',
    bar:'bar',
    area:'area'
}

selectedChartType = this.chartType.spline;

peroid = {
    week:'week',
    month:'month',
    year:'year'
}

periodSymbols = {
    week:'%e %b, %y',
    month:'%B',
    year:'%Y'
}

selectedPeriod = this.peroid.month;



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
            type: this.selectedChartType,
            backgroundColor: 'white',
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                
            },
        },
        yAxis: {
            title: {
                text: ''
            },
            min: 0
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
        }]
    };

    this.bsFastingChartOptions.series[0].name = this.bloodSugarType.bsFasting;

    this.bsFastingChartOptions.chart.type = this.selectedChartType;

    switch (this.selectedPeriod) {
        case this.peroid.week:
            this.bsFastingChartOptions.xAxis.dateTimeLabelFormats.month = this.periodSymbols.week;
            break;
        case this.peroid.month:
            this.bsFastingChartOptions.xAxis.dateTimeLabelFormats.month = this.periodSymbols.month;
            break;
        case this.peroid.year:
            this.bsFastingChartOptions.xAxis.dateTimeLabelFormats.month = this.periodSymbols.year;
            break;
        default:
            break;
    }
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
            type: this.selectedChartType,
            backgroundColor: 'white',
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                
            },
        },
        credits: {
            enabled: false
        },
        yAxis: {
            title: {
                text: ''
            },
            min: 0
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
        }]
    };

    this.bsNonFastingChartOptions.series[0].name = this.bloodSugarType.bsNonFasting;

    this.bsNonFastingChartOptions.chart.type = this.selectedChartType;

    switch (this.selectedPeriod) {
        case this.peroid.week:
            this.bsNonFastingChartOptions.xAxis.dateTimeLabelFormats.month = this.periodSymbols.week;
            break;
        case this.peroid.month:
            this.bsNonFastingChartOptions.xAxis.dateTimeLabelFormats.month = this.periodSymbols.month;
            break;
        case this.peroid.year:
            this.bsNonFastingChartOptions.xAxis.dateTimeLabelFormats.month = this.periodSymbols.year;
            break;
        default:
            break;
    }
}

changebsFastingChartType(event) {
    
    this.bsFastingChart();

    this.bsNonFastingChart();
}

changebsFastingPeriod(event) {
    this.bsFastingChart();

    this.bsNonFastingChart();
}



loadingFunc(){
  return this.loadingCtlr.create();
}


  //close the modal 
  closeModal() {
    this.viewCtlr.dismiss(); 
  }

}
