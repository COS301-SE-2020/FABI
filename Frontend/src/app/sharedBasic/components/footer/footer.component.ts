import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  DeviceType = localStorage.getItem("DeviceType");
  constructor() { }

  ngOnInit(): void {
  }
  toggleDevice(){
    localStorage.setItem("DeviceType",(this.DeviceType=="Desktop"?"Mobile":"Desktop"));
  }

}
