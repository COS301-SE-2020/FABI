import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spec-search',
  templateUrl: './spec-search.component.html',
  styleUrls: ['./spec-search.component.css']
})
export class SpecSearchComponent implements OnInit {
  // Temporary data sets
  /*name = "Sunflower";
  symptoms= ["Broken leaf", "Bite marks"];
  date= "18 March 2020";*/
  /*report = {
    name: "Sunflower",
    symptoms: ["Broken leaf", "Bite marks"],
    date: "18 March 2020"
  }*/
  reports = [
    {
      name: "Sunflower",
      symptoms: ["Broken leaf", "Bite marks"],
      date: "18 March 2020" 
    },
    {
      name: "Sunflower",
      symptoms: ["Broken leaf", "Bite marks"],
      date: "18 March 2020" 
    }
  ];

  constructor() { }

  ngOnInit(): void {

  }

}
