import { Component, OnInit, ViewChild } from '@angular/core';
import { SpecialistService } from './specialist.service';
import { LocationService } from '@/_services/location.service';
import { AlertService } from '@/_services/alert.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {FormControl} from '@angular/forms';
import { report } from 'process';
import { AuthenticationService } from '@/_UMservices/authentication.service';
import { Router } from '@angular/router';

// Filter
import { Observable, Subject } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ReportDataService } from '@/_services/report-data.service'
import {PageEvent} from '@angular/material/paginator';

export interface filterModel{
  Diagnosis:string;
  RepStatus:string;
  Distance:number;
  AffectedArea:string;
}

export interface filterValue{
  name: string;
}


@Component({
  selector: 'app-spec-search',
  templateUrl: './spec-search.component.html',
  styleUrls: ['./spec-search.component.css']
})
export class SpecSearchComponent implements OnInit {
  displayedColumns: string[] = ["Plant Name", "Cultivar", "Date", "Actions"];
  reports = [];
  dataSource;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  showFiltered() {
    return this.filtered;
  }
  // Initial table
  filtered;
  ITdatasource;
  ITdisplayedColumns: string[]=['Pname', 'distance', 'date']
  displayReady=false;
  datalength;
  pageEvent: PageEvent;

  // Filter values

  filter: filterModel={
    Diagnosis:"",
    RepStatus:"",
    Distance:5,
    AffectedArea:""
  }
  title = "All reports";

  Foptions :filterValue[]= [
    {name:"Eucalyptus/guava/myrtle rust pathogen"},
    {name:"Chrysoporthe canker"},
    {name:"Kirramyces stem canker "},
    {name:"Leaf blotch"},
    {name:"Pitch canker"},
    {name:"Wattle rust"},
    {name:"Ceratocystis wattle wilt"},
    {name:"Botryosphaeriaceae canker"},
    {name:"Armillaria root rot"},
    {name:"Phytophthora root rot"},
    {name:"Deodar weevil"},
    {name:"Bronze bug"},
    {name:"Eucalyptus weevil/snout beetle"},
    {name:"Wattle bagworm"},
    {name:"Sirex woodwasp"},
    {name:"Bluegum chalcid"},
    {name:"Wattle mirid"},
    {name:"Cossid moth/Quince borer"},
    {name:"Shell lerp psyllid"},
    {name:"Eucalyptus gall wasp"},
    {name:"Red gum lerp psyllid"},
  ];
  filteredOptions: Observable<any>;
  myControl = new FormControl();

  private _filter(name: string): filterValue[] {
    const filtervalue = name.toLowerCase();

    return this.Foptions.filter(option => option.name.toLowerCase().indexOf(filtervalue) === 0);
  }

  displayFn(filter: filterValue): string {
    return filter && filter.name ? filter.name : '';
  }


  options = [
    {
      value: '1', viewValue: 'Verified'
    },
    {
      value: '2', viewValue: 'Unverified'
    }
  ];

  areas = [
    {
      value: '1', viewValue: 'Root'
    },
    {
      value: '2', viewValue: 'Stem'
    },
    {
      value: '3', viewValue: 'Branch'
    },
    {
      value: '4', viewValue: 'Leaf / Leaves'
    },
    {
      value: '5', viewValue: 'Flowers'
    }
  ];

  constructor(
    private specialistService: SpecialistService, 
    private locationService: LocationService, 
    private repServe:ReportDataService,
    private auth:AuthenticationService,
    private router:Router
    ) { }

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

  ngOnInit(): void {
    this.filtered = 1;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
    this.dataSource = new MatTableDataSource(this.reports)
    this.dataSource.sort = this.sort

    this.paginatorInit();
  }
  viewReport(ID) {
    this.router.navigate(["/basic"],{state:{id:ID}})
    
  }


  filterReports() {
    console.log(this.filter.Diagnosis["name"]);
    
    // TODO: This function is incomplete and needs location data added
    this.locationService.getLocation().subscribe(location => {
      this.specialistService.filterReports(location.coords.latitude, location.coords.longitude, this.filter.RepStatus, this.filter.Diagnosis["name"], this.filter.Distance, this.filter.AffectedArea).subscribe(data => {
        console.log(data);
        
        if (data[0]["status"] == 500) {
          this.title = "No Reports found, showing all unfiltered reports"
          this.filtered = 1;
        }
        else {
          this.filtered = 0;
          data = data.filter(props => {
            delete props["__typename"]
            return true
          })
          this.title = "Reports found"
          this.reports = []
          data.forEach((obj) => {
            let cultivar = obj.form.substring(
              obj.form.lastIndexOf("Cultivarx2C")+11,
              obj.form.lastIndexOf("x2CWhere do you see the Pest")
            )
            console.log(cultivar);

            let tempObject = {
              ID: obj.ID,
              pName: obj.Pname,
              cultivar: cultivar,
              date: obj.date
            }
            this.reports.push(tempObject)
          })

          this.dataSource = new MatTableDataSource(this.reports)
        }
      })
    })

  }

}
