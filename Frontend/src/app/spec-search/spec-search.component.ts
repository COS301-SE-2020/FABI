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

  opttions: option[] = [
    {
      value: '1', viewValue: 'Correct'
    },
    {
      value: '2', viewValue: 'Incorrect'
    }
  ]

  constructor() { }

  ngOnInit(): void {

  }

}
