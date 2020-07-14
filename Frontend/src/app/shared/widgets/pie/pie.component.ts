import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
@Component({
  selector: 'app-widget-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  Highcharts = Highcharts
  chartOptions = {}
  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Pest and Pathogen Ratios'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      exporting: {
        enabled: true
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Afflictions',
        colorByPoint: true,
        data: [{
          name: 'Aphids',
          y: 61.41,
          sliced: true,
          selected: true
        }, {
          name: 'Cicadas',
          y: 11.84
        }, {
          name: 'Corn Earworms',
          y: 10.85
        }, {
          name: 'Cabbage Worms',
          y: 4.67
        }, {
          name: 'Sclerotinia',
          y: 4.18
        }, {
          name: 'Soybean Cyst',
          y: 1.64
        }, {
          name: 'Bean Pod Mottle',
          y: 1.6
        }, {
          name: 'Bacterial Blight',
          y: 1.2
        }, {
          name: 'Other',
          y: 2.61
        }]
      }]
    }
    HC_exporting(Highcharts)

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      )
    }, 100)
  }

}
