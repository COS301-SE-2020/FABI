import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {SpecialistService} from '@/spec-search/specialist.service'
import * as Highcharts from 'highcharts';
import { Observable, Subject } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

export interface filterValue{
  name: string;
}

export interface filterModel{
  Diagnosis:string;
  Reason:string;
}

@Component({
  selector: 'app-diagnose-report',
  templateUrl: './diagnose-report.component.html',
  styleUrls: ['./diagnose-report.component.css']
})
export class DiagnoseReportComponent implements OnInit {
  reportID:any = null; 
  verified=false;
  filteredOptions: Observable<any>;
  myControl = new FormControl();
  filter: filterModel={
    Diagnosis:"",
    Reason:""
  }
  constructor(
    private router: Router,
    private special:SpecialistService
  ) {
    this.reportID = this.router.getCurrentNavigation().extras.state;
    this.reportID = this.reportID != undefined ? this.reportID.id : null;
    if (this.reportID == null) {
      this.router.navigate(['/special']);
    }
  }

  private _filter(name: string): filterValue[] {
    const filtervalue = name.toLowerCase();

    return this.Foptions.filter(option => option.name.toLowerCase().indexOf(filtervalue) === 0);
  }

  displayFn(filter: filterValue): string {
    return filter && filter.name ? filter.name : '';
  }

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

  ngOnInit(): void {
    this.special.getDiagnosis(this.reportID).subscribe(data=>{
      console.log(data["data"]["getDiagnosis_Reason"]["status"]);
      if(data["data"]["getDiagnosis_Reason"]["status"]==500){
        this.verified=false;
        this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.Foptions.slice())
        );
        this.special.getNNData(this.reportID).subscribe(nnData => {
          let xValues = nnData["preDiagnosisNames"].split(',');
          let yValues = nnData["preDiagnosisProbabilities"].split`,`.map(x=>+x*100);

          Highcharts.chart('container', {
            chart: {
              type: 'bar'
            },
            title: {
              text: 'Diagnostic Suggestions from Diagbot'
            },
            xAxis: {
              categories: xValues,
              title: {
                text: null
              }
            }, credits: {
              enabled: false
            },
            yAxis: {
              min: 0,
              max: 100,
              title: {
                text: 'Percentage Certainty',
                align: 'high'
              },
              labels: {
                overflow: 'justify'
              }
            },
            plotOptions: {
              bar: {
                dataLabels: {
                  enabled: true
                }
              }
            },
            series: [{
              type: 'bar',
              data: yValues
            }]
          });
        })

      }
      else if(data["data"]["getDiagnosis_Reason"]["status"]==201){
        this.verified=true;
        
      }
    })
    
  }

  submitVerification(){
    this.special.diagnose(this.reportID,this.filter.Diagnosis["name"],this.filter.Reason).subscribe(data=>{
      this.router.navigate(["/special"]);
      
    });
    
  }
}
