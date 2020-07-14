import { Component, OnInit, Input } from '@angular/core';
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
  @Input() data: []
  
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
      series: this.data
    };
    HC_exporting(Highcharts)

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      )
    }, 300)
  }
}
