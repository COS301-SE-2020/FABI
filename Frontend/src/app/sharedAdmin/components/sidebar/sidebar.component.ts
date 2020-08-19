/*
 * File Name: sidebar.component.ts
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
 * Related Documents              : None
 * 
 * Notes:
 *            Version:            : 0.1.0
 *            Author:             : Steven Jordaan - steven.j.jordaan2000@gmail.com
 *            Creation Date:      : Friday, July 17th 2020, 11:56:03 am
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 
 * Functional Description         : This provides the sidebar functionality for the admin layout
 * Constraints                    : User must be an admin
 * Assumptions                    : None
 */




import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@/_UMservices/authentication.service';
import { User } from '@/_models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: User

  constructor(private service: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.service.currentUserValue
  }

}
