import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map-report',
  templateUrl: './map-report.component.html',
  styleUrls: ['./map-report.component.css']
})
export class MapReportComponent implements OnInit {
  reportID = history.state.ID;    // To be used to get this report
  constructor(
    private router: Router,
    ) { 
        
    }

  ngOnInit(): void {
      document.getElementById("ID").innerHTML="Report for ID: "+this.reportID;
  }

}
