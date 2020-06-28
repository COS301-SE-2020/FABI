import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Report} from '@/_models/report'
import {ReportDataService} from '@/_services/report-data.service'

import * as pnds from '@/PestAndDiseases.json'

@Component({
  selector: 'app-map-report',
  templateUrl: './map-report.component.html',
  styleUrls: ['./map-report.component.css']
})
export class MapReportComponent implements OnInit {
  currentMark:Report;
  pestsAndDiseases:  any=(pnds as any).default;
  pnd:Object;
  ScienceName:string;
  Name:string;
  Plant:string;
  Distribution:string;
  Status:string;
  Description:string;
  Symptoms:string;
  Management:string;
  Images:Array<string>=[];
  Type:string;
  constructor(
    private router: Router,
    private currentMarkServ:ReportDataService
    ) { 
        this.currentMark=this.currentMarkServ.currentRepValue;
        
    }

  /**
   * on init
   * initializes pnd (Pest or disease) from the PestAndDiseases.json list
   */
  ngOnInit(): void {
    this.pnd= this.getPestOrDisease(this.currentMark);
    if(this.pnd==null){
        alert("That pest or disease doesn't exist yet.");
        this.router.navigate([""]);
    }
    this.setDisplay();
      
  }

  setDisplay(){
    

    this.Description=this.pnd["Description"];
    this.Distribution=this.pnd["Distribution"];
   
    
    this.pnd["Images"].forEach(element => {
      this.Images.push(element["Image"]);
    });
    console.log(this.Images[0]);

    this.Management=this.pnd["Management"];
    this.Name=this.pnd["Name"];
    this.Plant=this.pnd["Plant"];
    this.ScienceName=this.pnd["ScienceName"];
    this.Status=this.pnd["Status"];
    this.Symptoms=this.pnd["Symptoms"];
    this.Type=this.pnd["Type"];
  }

  getPestOrDisease(pnd):Object{
    var value=null;
    this.pestsAndDiseases.forEach(element => {
      if(element.Type==pnd.InflictionType){
        element.Data.forEach(element => {
            if(element.ScienceName==pnd.InflictionName||element.Name==pnd.InflictionName)
            value= element;
        });
      }
    });
    return value;
  }

}
