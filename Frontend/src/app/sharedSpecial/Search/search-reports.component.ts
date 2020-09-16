import { Component, OnInit } from '@angular/core';
import { LocationService } from '@/_services/location.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from '@/_UMservices/authentication.service';
import { Router,ActivatedRoute, NavigationEnd } from '@angular/router';
import { SpecialistService } from '@/sharedSpecial/specialist.service';

// Filter
import { ReportDataService } from '@/_services/report-data.service'
import {PageEvent} from '@angular/material/paginator';

export interface filterModel {
  Diagnosis: string;
  RepStatus: string;
  Distance: number;
  AffectedArea: string;
}

@Component({
  selector: 'app-search-reports',
  templateUrl: './search-reports.component.html',
  styleUrls: ['./search-reports.component.css']
})
export class SearchReportsComponent implements OnInit {
  filter: filterModel = {
    Diagnosis: "",
    RepStatus: "",
    Distance: 5,
    AffectedArea: ""
  }

  constructor(
    
    
    private locationService: LocationService, 
    private repServe:ReportDataService,
    private auth:AuthenticationService,
    private route: ActivatedRoute,
    private specialistService: SpecialistService, 
    
    private router:Router
  ) { 
    this.router.events.subscribe(data => {
      if (data instanceof NavigationEnd)if (this.route.snapshot.queryParamMap.get("Filter") != null) {

        var filterQuery = JSON.parse(this.route.snapshot.queryParamMap.get("Filter"));
          this.filter={
            Diagnosis:filterQuery["Diagnosis"],
            RepStatus:filterQuery["RepStatus"],
            Distance:filterQuery["Distance"],
            AffectedArea:filterQuery["AffectedArea"],
          }
        this.locationService.getLocation().subscribe(data=>{
          
          
          this.specialistService.filterReports(data.coords.latitude, data.coords.longitude, this.filter.RepStatus, this.filter.Diagnosis["name"], this.filter.Distance, this.filter.AffectedArea).subscribe(data => {
            console.log(data);
            
          });
        })
        

        // this.specialistService.filterReports(location.coords.latitude, location.coords.longitude, this.filter.RepStatus, this.filter.Diagnosis["name"], this.filter.Distance, this.filter.AffectedArea).subscribe(data => {});

      }
    });
    
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
