import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-report-graph',
  templateUrl: './report-graph.component.html',
  styleUrls: ['./report-graph.component.css']
})
export class ReportGraphComponent implements OnInit {

  constructor() { }


  chartOptions: {};

  Highcharts = Highcharts;

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Diagnostic Report Count by Region'
      },
      subtitle: {
        text: 'For Specific Company'
      },
      yAxis: {
        title: {
          text: 'Number of Reports'
        }
      },
      xAxis: {
        accessibility: {
          rangeDescription: 'Range: last 7 days'
        },
        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

      },
      tooltip: {
        split: true,
        valueSuffix: ' reports'
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: true
      },
      series: [{
        name: 'Free State',
        data: [12, 14, 11, 9, 3, 1, 4]
      }, {
        name: 'Mpumalanga',
        data: [24, 26, 24, 23, 11, 23, 17]
      }, {
        name: 'Gauteng',
        data: [9, 4, 6, 8, 12, 15, 17]
      }, {
        name: 'Kwazulu-Natal',
        data: [25, 28, 26, 24, 26, 16, 19]
      }, {
        name: 'Western Cape',
        data: [2, 2, 2, 6, 13, 30, 46]
      }]
    };
    HC_exporting(Highcharts)

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      )
    }, 100)
  }
}
