import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@/_UMservices/authentication.service';
import { User } from '@/_models/user';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ButtonListenerService } from "@/_services/buttonListener.service";
import { Subscription } from 'rxjs';
import { Body } from '@angular/http/src/body';
import { sha256 } from 'js-sha256';



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
  basicUser:boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private deviceService: DeviceDetectorService,
    private styleSwitch: ButtonListenerService
  ) {
    this.basicUser=this.authenticationService.currentUserTypeValue==sha256("basic");
    
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.styleSub = this.styleSwitch.getStyle().subscribe(data => {
      this.currentStyle = data.text;
    });
  }

  ngOnInit(): void {
    sessionStorage.setItem("StyleMode", "Dark");
    sessionStorage.setItem("Browser",this.deviceService.browser);

    if (sessionStorage.getItem("DeviceType") == null) {
      if (this.deviceService.isDesktop()) {
        sessionStorage.setItem("DeviceType", "Desktop");
      }
      else if (this.deviceService.isMobile()) {
        sessionStorage.setItem("DeviceType", "Mobile");
      }
      else {
        sessionStorage.setItem("DeviceType", "Desktop");
      }
    }
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
