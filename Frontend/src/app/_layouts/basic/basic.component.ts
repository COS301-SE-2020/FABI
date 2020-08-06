import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@/_services/authentication.service';
import { User } from '@/_models/user';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ButtonListenerService } from "@/_services/buttonListener.service";
import { Subscription } from 'rxjs';
import { Body } from '@angular/http/src/body';



@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  currentUser: User;
  currentStyle="Dark";
  styleSub: Subscription;
  deviceSub:Subscription;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private deviceService: DeviceDetectorService,
    private styleSwitch: ButtonListenerService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.styleSub = this.styleSwitch.getStyle().subscribe(data => {
      this.currentStyle = data.text;
    });
  }

  ngOnInit(): void {
    localStorage.setItem("StyleMode", "Dark");

    if (localStorage.getItem("DeviceType") == null) {
      if (this.deviceService.isDesktop()) {
        localStorage.setItem("DeviceType", "Desktop");
      }
      else if (this.deviceService.isMobile()) {
        localStorage.setItem("DeviceType", "Mobile");
      }
      else if (this.deviceService.isTablet()) {
        localStorage.setItem("DeviceType", "Tablet");
      }
      else {
        localStorage.setItem("DeviceType", "Desktop");
      }
    }
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
