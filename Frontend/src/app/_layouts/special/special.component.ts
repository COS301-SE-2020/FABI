import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.css']
})
export class SpecialComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  filterClicked=false;

  ngOnInit(): void {
  }

  filterButton(){
    this.filterClicked=!this.filterClicked;
  }

  clearFilters(){
    this.router.navigate(["/special"]);
  }

  

}
