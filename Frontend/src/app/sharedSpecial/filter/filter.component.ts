import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs'
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';


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
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filter: filterModel={
    Diagnosis:"",
    RepStatus:"",
    Distance:5,
    AffectedArea:""
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


  constructor() { }

  filteredOptions: Observable<any>;
  myControl = new FormControl();

  private _filter(name: string): filterValue[] {
    const filtervalue = name.toLowerCase();

    return this.Foptions.filter(option => option.name.toLowerCase().indexOf(filtervalue) === 0);
  }

  displayFn(filter: filterValue): string {
    return filter && filter.name ? filter.name : '';
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.Foptions.slice())
      );
  }

  filterReports() {}

}
