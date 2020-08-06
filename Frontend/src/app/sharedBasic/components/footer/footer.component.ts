import { Component, OnInit } from '@angular/core';
import { ButtonListenerService } from "@/_services/buttonListener.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  DeviceType = localStorage.getItem("DeviceType");
  subscription: Subscription;
  currentStyle = "Dark";
  constructor(
    private styleSwitch: ButtonListenerService
  ) {
    this.subscription = this.styleSwitch.getStyle().subscribe(data => {
      this.currentStyle = data.text;
    });
  }

  ngOnInit(): void {
  }
  toggleDevice() {
    localStorage.setItem("DeviceType", (this.DeviceType == "Desktop" ? "Mobile" : "Desktop"));
    location.reload();
  }

}
