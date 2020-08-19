/*
 * File Name: card.component.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : Label, total, percentage, data
 * Output                         : None
 * Related Requirements           : Reporting
 * Classes in this file           : None
 * Related Documents              : Highcharts documentation
 * 
 * Notes:
 *            Version:            : 0.1.0
 *            Author:             : Steven Jordaan - steven.j.jordaan2000@gmail.com
 *            Creation Date:      : Tuesday, July 14th 2020, 5:17:11 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 2020-07-15-11-57-am	  SJ	Added coding standards
 * 
 * Functional Description         : Used to create the chart in the card
 * Constraints                    : Card must be rendered
 * Assumptions                    : User is on a desktop, not scalable to mobile
 */




import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() label: string
  @Input() total: string
  @Input() percentage: string
  @Input() data
  refinedData
  Highcharts = Highcharts
  chartOptions = {}

  constructor() { }
  /**
   * @name ngOnInit
   * @description This instantiates the chart within the card
   *
   * @memberof CardComponent
   */
  ngOnInit(): void {
    this.refinedData = this.data.split(",").map(Number).filter(x => x != "")
    
    this.chartOptions = {
      chart: {
        type: 'spline',
        backgroundColor: null,
        borderWidth: 0,
        margin: [2, 2, 2, 2],
        height: 60
      },
      title: {
        text: null
      },
      subtitle: {
        text: null
      },
      yAxis: {
        labels: {
          enabled: false
        },
        title: {
          text: null
        },
        startOnTick: false,
        endOnTick: false,
        tickOptions: []
      },
      xAxis: {
        labels: {
          enabled: false
        },
        title: {
          text: null
        },
        startOnTick: false,
        endOnTick: false,
        tickOptions: []
      },
      tooltip: {
        split: true,
        outside: true
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        data: this.refinedData
      }]
    }
    HC_exporting(Highcharts)

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      )
    }, 300)
  }

}