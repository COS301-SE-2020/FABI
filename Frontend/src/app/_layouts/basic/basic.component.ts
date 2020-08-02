import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { User } from '../../_models/user';
import { DeviceDetectorService } from 'ngx-device-detector';



@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  currentUser: User;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private deviceService: DeviceDetectorService
    ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x); }

  ngOnInit(): void {
    this.isDesktop=this.deviceService.isDesktop();
    this.isMobile=this.deviceService.isMobile();
    this.isTablet=this.deviceService.isTablet();
  }
  

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
