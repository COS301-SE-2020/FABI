/*
 * File Name: admin.component.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : None
 * Output                         : None
 * Related Requirements           : None
 * Classes in this file           : None
 * Related Documents              : SRS Document
 * 
 * Notes:
 *            Version:            : 0.1.0
 *            Author:             : Steven Jordaan - steven.j.jordaan2000@gmail.com
 *            Creation Date:      : Thursday, July 16th 2020, 6:25:12 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : Contains the functionality for the admin user's base layout component
 * Constraints                    : User must be an admin user
 * Assumptions                    : User must be on desktop, it is not responsive to mobile
 */




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
