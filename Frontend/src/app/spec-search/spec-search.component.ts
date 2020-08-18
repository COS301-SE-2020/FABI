import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spec-search',
  templateUrl: './spec-search.component.html',
  styleUrls: ['./spec-search.component.css']
})
export class SpecSearchComponent implements OnInit {
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

  options = [
    {
      value: '1', viewValue: 'Verified'
    },
    {
      value: '2', viewValue: 'Unverivied'
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

  constructor() { }

  ngOnInit(): void {

  }

}
