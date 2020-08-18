/*
 * File Name: app.component.ts
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
 *            Creation Date:      : Sunday, July 5th 2020, 5:28:23 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 2020-07-15-12-06-pm	  SJ	Added coding standards
 * 
 * Functional Description         : Main app element for injecting other components
 * Constraints                    : None
 * Assumptions                    : None
 */



// Angular specifc imports
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthenticationService } from '@/_UMservices/authentication.service';
import { ReportDataService } from './_services/report-data.service'

// Models
import { User } from './_models/user';
import { Report } from './_models/report'


@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  currentUser: User;

  title: 'FABI-Surveillance';

  currentReport: Report;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private reportDataService: ReportDataService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
