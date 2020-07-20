import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  sideBarOpen = true;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * @name sideBarToggler
   * @description Sets the sideBarOpen value to the opposite for opening
   *              and closing the sidebar
   *
   * @memberof AdminComponent
   */
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
