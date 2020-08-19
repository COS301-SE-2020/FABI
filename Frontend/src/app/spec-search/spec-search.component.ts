import { Component, OnInit, ViewChild } from '@angular/core';
import { SpecialistService } from './specialist.service';
import { LocationService } from '@/_services/location.service';
import { AlertService } from '@/_services/alert.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { report } from 'process';

export interface filterModel{
  Diagnosis:string;
  RepStatus:string;
  Distance:number;
  AffectedArea:string;
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

  // Filter values

  filter: filterModel={
    Diagnosis:"",
    RepStatus:"",
    Distance:5,
    AffectedArea:""
  }
  title = "Reports will appear here"


  options = [
    {
      value: '1', viewValue: 'Verified'
    },
    {
      value: '2', viewValue: 'Unverified'
    }
  ]

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
  ]

  constructor(private specialistService: SpecialistService, private locationService: LocationService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.reports)
    this.dataSource.sort = this.sort
  }
  viewReport(id) {
    
  }
  filterReports() {
    // TODO: This function is incomplete and needs location data added
    this.locationService.getLocation().subscribe(location => {
      this.specialistService.filterReports(location.coords.latitude, location.coords.longitude, this.filter.RepStatus, this.filter.Diagnosis, this.filter.Distance, this.filter.AffectedArea).subscribe(data => {
        if (data[0]["status"] == 500) {
          this.title = "No Reports found"
        }
        else {
          data = data.filter(props => {
            delete props["__typename"]
            return true
          })
          this.title = "Reports found"
          this.reports = []
          data.forEach((obj) => {
            // let cultivar = obj["form"].substring(
            //   obj["form"].lastIndexOf("Cultivarx2C"),
            //   obj["form"].lastIndexOf("x2CWhere do you see the Pest")
            // )
            console.log(data);
            console.log(obj);

            let cultivar = "Pie"
            let tempObject = {
              ID: obj.ID,
              pName: obj.Pname,
              cultivar: cultivar,
              date: obj.date
            }
            this.reports.push(tempObject)
          })
          console.log(this.reports);

          this.dataSource = new MatTableDataSource(this.reports)
        }
      })
    })

  }

}
