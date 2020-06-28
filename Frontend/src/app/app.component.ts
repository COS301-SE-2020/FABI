import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';

import {Report} from './_models/report'
import {ReportDataService} from './_services/report-data.service'

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  currentUser: User;
  title: 'FABI-Surveillance';
  currentReport:Report;
  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private reportDataService:ReportDataService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.reportDataService.currentMark.subscribe(x => this.currentReport = x);
      
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
