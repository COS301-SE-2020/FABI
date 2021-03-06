/*
 * File Name: report-graph.component.ts
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
 *            Version:            : 0.1.0
 *            Author:             : Steven Jordaan - steven.j.jordaan2000@gmail.com
 *            Creation Date:      : Tuesday, July 14th 2020, 4:28:59 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : Instantiates the large line chart on the dashboard
 * Constraints                    : None
 * Assumptions                    : User is on desktop device, not scalable to mobile
 */



// Angular specific imports
import { Component, OnInit, Input } from '@angular/core';

// Highchart specific imports
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { DashboardService } from '@/_components/dashboard.service';

@Component({
  selector: 'app-widget-report-graph',
  templateUrl: './report-graph.component.html',
  styleUrls: ['./report-graph.component.css']
})
export class ReportGraphComponent implements OnInit {

  categoriesData = []
  seriesData = []
  Highcharts = Highcharts;
  chartOptions: {};

  constructor(private service: DashboardService) { }

  ngOnInit(): void {
    this.service.bigChart().subscribe(data => {
      data = JSON.parse(data)
      for (let prop in data){
        if (!data.hasOwnProperty(prop)){
          continue
        }
        this.categoriesData.push(prop)
        this.seriesData.push(data[prop])
      }
      let seriesObj = [{
        name: 'FABI',
        data: this.seriesData
      }]
      this.populateGraph(seriesObj, this.categoriesData)
      
    })
  }

  populateGraph(seriesData, categoriesData) {
    this.chartOptions = {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Diagnostic Report Count within FABI'
      },
      subtitle: {
        text: 'For the last 7 days'
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
        categories: categoriesData

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
      series: seriesData
    };
    HC_exporting(Highcharts)

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      )
    }, 300)
  }
}
