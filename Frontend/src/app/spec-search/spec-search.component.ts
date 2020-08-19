import { Component, OnInit } from '@angular/core';
import { SpecialistService } from './specialist.service';
import { LocationService } from '@/_services/location.service';
import { AlertService } from '@/_services/alert.service';
@Component({
  selector: 'app-spec-search',
  templateUrl: './spec-search.component.html',
  styleUrls: ['./spec-search.component.css']
})
export class SpecSearchComponent implements OnInit {
  // Filter values
  distance = 10;
  diagnosis = "";
  status
  affectedArea
  title = "Reports"

  reports = [
    {
      name: "Sunflower",
      symptoms: ["Broken leaf", "Bite marks"],
      date: "18 March 2020" 
    },
    {
      name: "P1",
      symptoms: ["Broken leaf", "Bite marks"],
      date: "18 March 2020" 
    },
    {
      name: "P2",
      symptoms: ["Broken leaf", "Bite marks"],
      date: "18 March 2020"
    },
    {
      name: "P3",
      symptoms: ["Broken leaf", "Bite marks"],
      date: "18 March 2020"
    },
    {
      name: "P4",
      symptoms: ["Broken leaf", "Bite marks"],
      date: "18 March 2020"
    }
  ];
  // reports

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

  constructor(private specialistService: SpecialistService, private locationService: LocationService, private alertService: AlertService) { }

  ngOnInit(): void {

  }
  filterReports() {
    // TODO: This function is incomplete and needs location data added
      this.locationService.getLocation().subscribe(location => {
        this.specialistService.filterReports(location.coords.latitude, location.coords.longitude, this.status, this.diagnosis, this.distance, this.affectedArea).subscribe(data => {
          if (data[0]["status"] == 500){
            this.title = "No Reports found"            
          }
        })
      })

  }

}
