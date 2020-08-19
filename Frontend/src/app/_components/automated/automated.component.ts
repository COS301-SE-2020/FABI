import { Component, OnInit } from '@angular/core';
// Highchart specific imports
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { DashboardService } from '@/_components/dashboard.service';
import { Options } from "highcharts";

@Component({
  selector: 'app-automated',
  templateUrl: './automated.component.html',
  styleUrls: ['./automated.component.css']
})
export class AutomatedComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  lightChartOptions: Options;
  ambTempChartOptions: Options;
  airChartOptions: Options;
  coChartOptions: Options;
  ccs811ChartOptions: Options;
  uvChartOptions: Options;
  uvaChartOptions: Options;
  concTempChartOptions: Options;
  constructor() { }

  ngOnInit(): void {
    this.lightChartOptions = {
      chart: {
        type: 'scatter',
        marginRight: 10,
        events: {
          load: function () {
            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function () {
              var x = (new Date()).getTime(), // current time
                y = Math.random()*(16600-14800)+14800;
              series.addPoint([x, y], true, true);
            }, 1000);
          }
        }
      },
      credits: {
        enabled: false
      },
      time: {
        useUTC: false
      },
      title: {
        text: 'Light Intensity'
      },
      accessibility: {
        announceNewData: {
          enabled: true,
          minAnnounceInterval: 15000,
          announcementFormatter: function (allSeries, newSeries, newPoint) {
            if (newPoint) {
              return 'New point added. Value: ' + newPoint.y;
            }
            return false;
          }
        }
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        min: 14500,
        max: 17000,
        title: {
          text: 'Lux'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        type: 'scatter',
        name: 'SNOET data',
        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.random()*(17000-15000)+15000
            });
          }
          return data;
        }())
      },
    ]
    }
    this.ambTempChartOptions = {
      chart: {
        type: 'scatter',
        marginRight: 10,
        events: {
          load: function () {
            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function () {
              var x = (new Date()).getTime(), // current time
                y = Math.random()*(38-36)+36;
              series.addPoint([x, y], true, true);
            }, 1000);
          }
        }
      },
      credits: {
        enabled: false
      },
      time: {
        useUTC: false
      },
      title: {
        text: 'Ambient Room Temperature'
      },
      accessibility: {
        announceNewData: {
          enabled: true,
          minAnnounceInterval: 15000,
          announcementFormatter: function (allSeries, newSeries, newPoint) {
            if (newPoint) {
              return 'New point added. Value: ' + newPoint.y;
            }
            return false;
          }
        }
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        min: 0,
        max: 40,
        title: {
          text: 'Degrees Celcius'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        type: 'scatter',
        name: 'SNOET data',
        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.random()*(38-36)+36
            });
          }
          return data;
        }())
      },
    ]
    }
    this.airChartOptions = {
      chart: {
        type: 'scatter',
        marginRight: 10,
        events: {
          load: function () {
            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function () {
              var x = (new Date()).getTime(), // current time
                y = Math.random()*(40-30)+30;
              series.addPoint([x, y], true, true);
            }, 1000);
          }
        }
      },
      credits: {
        enabled: false
      },
      time: {
        useUTC: false
      },
      title: {
        text: 'Air particle distribution'
      },
      accessibility: {
        announceNewData: {
          enabled: true,
          minAnnounceInterval: 15000,
          announcementFormatter: function (allSeries, newSeries, newPoint) {
            if (newPoint) {
              return 'New point added. Value: ' + newPoint.y;
            }
            return false;
          }
        }
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        min: 0,
        max: 50,
        title: {
          text: '0.1 - 10 micron'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        type: 'scatter',
        name: 'SNOET data',
        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.random()*(40-30)+30
            });
          }
          return data;
        }())
      },
    ]
    }
    this.coChartOptions = {
      chart: {
        type: 'scatter',
        marginRight: 10,
        events: {
          load: function () {
            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function () {
              var x = (new Date()).getTime(), // current time
                y = Math.random()*(500-480)+480;
              series.addPoint([x, y], true, true);
            }, 1000);
          }
        }
      },
      credits: {
        enabled: false
      },
      time: {
        useUTC: false
      },
      title: {
        text: 'CO2 Concentration'
      },
      accessibility: {
        announceNewData: {
          enabled: true,
          minAnnounceInterval: 15000,
          announcementFormatter: function (allSeries, newSeries, newPoint) {
            if (newPoint) {
              return 'New point added. Value: ' + newPoint.y;
            }
            return false;
          }
        }
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        min: 440,
        max: 520,
        title: {
          text: 'ppm'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        type: 'scatter',
        name: 'SNOET data',
        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.random()*(500-480) + 480
            });
          }
          return data;
        }())
      },
    ]
    }
    this.ccs811ChartOptions = {
      chart: {
        type: 'scatter',
        marginRight: 10,
        events: {
          load: function () {
            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function () {
              var x = (new Date()).getTime(), // current time
                y = Math.random()*(4.4-0);
              series.addPoint([x, y], true, true);
            }, 1000);
          }
        }
      },
      credits: {
        enabled: false
      },
      time: {
        useUTC: false
      },
      title: {
        text: 'CCS811TVOC (organic volatile concentration)'
      },
      accessibility: {
        announceNewData: {
          enabled: true,
          minAnnounceInterval: 15000,
          announcementFormatter: function (allSeries, newSeries, newPoint) {
            if (newPoint) {
              return 'New point added. Value: ' + newPoint.y;
            }
            return false;
          }
        }
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        min: 0,
        max: 10,
        title: {
          text: 'ppb'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        type: 'scatter',
        name: 'SNOET data',
        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.random()*(4.4)
            });
          }
          return data;
        }())
      },
    ]
    }
    this.uvChartOptions = {
      chart: {
        type: 'scatter',
        marginRight: 10,
        events: {
          load: function () {
            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function () {
              var x = (new Date()).getTime(), // current time
                y = Math.random()*(1-0.9)+0.9;
              series.addPoint([x, y], true, true);
            }, 1000);
          }
        }
      },
      credits: {
        enabled: false
      },
      time: {
        useUTC: false
      },
      title: {
        text: 'Calibrated UVindex'
      },
      accessibility: {
        announceNewData: {
          enabled: true,
          minAnnounceInterval: 15000,
          announcementFormatter: function (allSeries, newSeries, newPoint) {
            if (newPoint) {
              return 'New point added. Value: ' + newPoint.y;
            }
            return false;
          }
        }
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        min: 0,
        max: 2,
        title: {
          text: ''
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        type: 'scatter',
        name: 'SNOET data',
        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.random()*(1-0.9)+0.9
            });
          }
          return data;
        }())
      },
    ]
    }
    this.concTempChartOptions = {
      chart: {
        type: 'scatter',
        marginRight: 10,
        events: {
          load: function () {
            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function () {
              var x = (new Date()).getTime(), // current time
                y = Math.random()*(501-499)+499;
              series.addPoint([x, y], true, true);
            }, 1000);
          }
        }
      },
      credits: {
        enabled: false
      },
      time: {
        useUTC: false
      },
      title: {
        text: 'UVA light intensity'
      },
      accessibility: {
        announceNewData: {
          enabled: true,
          minAnnounceInterval: 15000,
          announcementFormatter: function (allSeries, newSeries, newPoint) {
            if (newPoint) {
              return 'New point added. Value: ' + newPoint.y;
            }
            return false;
          }
        }
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        min: 0,
        max: 2500,
        title: {
          text: ''
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        type: 'scatter',
        name: 'SNOET data',
        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.random()*(501-499)+499
            });
          }
          return data;
        }())
      },
    ]
    }
    this.uvaChartOptions = {
      chart: {
        type: 'scatter',
        marginRight: 10,
        events: {
          load: function () {
            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function () {
              var x = (new Date()).getTime(), // current time
                y = Math.random()*(30.5-28.5)+28.5;
              series.addPoint([x, y], true, true);
            }, 1000);
          }
        }
      },
      credits: {
        enabled: false
      },
      time: {
        useUTC: false
      },
      title: {
        text: 'Concrete floor infrared temperature'
      },
      accessibility: {
        announceNewData: {
          enabled: true,
          minAnnounceInterval: 15000,
          announcementFormatter: function (allSeries, newSeries, newPoint) {
            if (newPoint) {
              return 'New point added. Value: ' + newPoint.y;
            }
            return false;
          }
        }
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        min: 0,
        max: 40,
        title: {
          text: 'Degrees Celcius'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        type: 'scatter',
        name: 'SNOET data',
        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.random()*(30.5-28.5)+28.5
            });
          }
          return data;
        }())
      },
    ]
    }
  }

}
