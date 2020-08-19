import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-diagnose-report',
  templateUrl: './diagnose-report.component.html',
  styleUrls: ['./diagnose-report.component.css']
})
export class DiagnoseReportComponent implements OnInit {
  reportID = null;
  constructor(
    private router: Router
  ) {
    this.reportID = this.router.getCurrentNavigation().extras.state;
    this.reportID = this.reportID != undefined ? this.reportID.id : null;
    if (this.reportID == null) {
      this.router.navigate(['/special']);
    }
  }

  ngOnInit(): void {
    Highcharts.chart('container', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Diagnostic Suggestions from Diagbot'
      },
      xAxis: {
        categories: ['Army Ant', 'Pest 1', 'Pest 2', 'Pathogen 1'],
        title: {
          text: null
        }
      }, credits: {
        enabled: false
      },
      yAxis: {
        min: 0,
        max: 100,
        title: {
          text: 'Percentage Certainty',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        type: 'bar',
        data: [30, 45, 34, 23]
      }]
    });
  }
}
