import { Component, OnInit } from '@angular/core';
import { LocationService } from '@/_services/location.service';
import { AlertService } from '@/_services/alert.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {FormControl} from '@angular/forms';
import { report } from 'process';
import { AuthenticationService } from '@/_UMservices/authentication.service';
import { Router,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Filter
import { Observable, Subject } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ReportDataService } from '@/_services/report-data.service'
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-search-reports',
  templateUrl: './search-reports.component.html',
  styleUrls: ['./search-reports.component.css']
})
export class SearchReportsComponent implements OnInit {

  constructor(
    
    
    private locationService: LocationService, 
    private repServe:ReportDataService,
    private auth:AuthenticationService,
    
    private router:Router
  ) { 
    
  }
  // Initial table
  filtered;
  ITdatasource;
  ITdisplayedColumns: string[]=['Pname', 'distance', 'date']
  displayReady=false;
  datalength;
  pageEvent: PageEvent;

  reports = [];
  dataSource = new MatTableDataSource(this.reports)

  paginatorInit(){
    this.locationService.getLocation().subscribe(location => {
    this.repServe.requestNearbyReportsMobile(this.auth.currentUserValue,location.coords.latitude,location.coords.longitude).subscribe(rep=>{
      this.ITdatasource=(this.repServe.getNearbyReportsMobile(0));
      this.datalength=this.repServe.reportsLength;
  });})
}

getNearbyReports(event){
  this.ITdatasource=(this.repServe.getNearbyReportsMobile(event.pageIndex));
}

viewReport(ID) {
  this.router.navigate(["/special"],{queryParams:{ID:ID}})
  
}

  ngOnInit(): void {
    this.paginatorInit();
  }

}
