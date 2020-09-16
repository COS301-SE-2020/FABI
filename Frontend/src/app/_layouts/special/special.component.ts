import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.css']
})
export class SpecialComponent implements OnInit {

  constructor() { }

  filterClicked=false;

  ngOnInit(): void {
  }

  filterButton(){
    this.filterClicked=!this.filterClicked;
  }

}
