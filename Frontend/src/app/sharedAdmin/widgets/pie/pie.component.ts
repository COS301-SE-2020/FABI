/*
 * File Name: pie.component.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : data
 * Output                         : None
 * Related Requirements           : Reporting
 * Classes in this file           : None
 * Related Documents              : Highcharts documentation
 * 
 * Notes:
 *            Version:            : 0.0.0
 *            Author:             : Steven Jordaan - steven.j.jordaan2000@gmail.com
 *            Creation Date:      : Tuesday, July 14th 2020, 6:10:29 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : Instantiates the chart on the dashboard
 * Constraints                    : None
 * Assumptions                    : User is on a desktop device, not scalable to mobile
 */


/** 
 * HIGHCHARTS IS A FRAGILE ECOSYSTEM, THIS CODE WORKS BUT PRODUCES PROBLEMS IN THE TERMINAL
 * DO NOT TRY TO REMOVE ANYTHING UNLESS YOU KNOW WHAT YOU ARE DOING. IT IS VERY BAD WITH DATA
*/
// Angular specific imports
import { Component, OnInit, Input } from '@angular/core';

// Highcharts specific imports
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { Options } from "highcharts";
import { DashboardService } from '../../../_components/dashboard.service';
@Component({
  selector: 'app-widget-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  // chart
  chartOptions: Options;
  pieChartData = []
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    // this.chart = Highcharts.chart('container', this.chartOptions);

    this.dashboardService.pieChart().subscribe(data => {
      data = data.filter(props => {
        delete props["__typename"]
        return true
      })
      this.chartOptions = {
        chart: {
          renderTo: 'container',
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
          type: 'pie',
          name: 'Afflictions',
          colorByPoint: true,
          data: data
        }]
      }
    })

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      )
    }, 100)
  }
}