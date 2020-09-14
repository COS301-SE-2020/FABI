import { Component, OnInit } from '@angular/core';
import { ButtonListenerService } from "@/_services/buttonListener.service";
import { Subscription } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  DeviceType = this.deviceService.isDesktop?"Desktop":"Mobile";
  subscription: Subscription;
  currentStyle = "Dark";
  constructor(
    private router: Router,
    private styleSwitch: ButtonListenerService,
    private deviceService: DeviceDetectorService,
  ) {
    this.subscription = this.styleSwitch.getStyle().subscribe(data => {
      this.currentStyle = data.text;
    });
  }

  ngOnInit(): void {
  }
  toggleDevice() {
    
    this.DeviceType = this.DeviceType=="Desktop" ? "Mobile" : "Desktop";
    this.styleSwitch.switchDevice(this.DeviceType);
    this.router.navigate(["/basic"]);
  }

}
