import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@/_UMservices/authentication.service';
import { User } from '@/_models/user';
import {ButtonListenerService} from "@/_services/buttonListener.service";
import { style } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {

  currentUser: User;
  userType = "Undecided"
  curStyle = "Dark";
  colour=this.curStyle=="Dark"?"white":"black";
  navStyles={"Dark":"navbar-dark bg-dark","Light":"navbar-light bg-light"};
  navMode=this.curStyle=="Dark"?this.navStyles.Dark:this.navStyles.Light;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private styleSwitch : ButtonListenerService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.authenticationService.getUserType(this.authenticationService.currentUserValue).subscribe(data=>{
      this.userType=data;
      
    });
  }





  ngAfterViewInit(): void { 
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  home(){
    
      this.authenticationService.getUserType(this.authenticationService.currentUserValue).subscribe(data=>{
        this.userType=data;
        this.router.navigate(["/"+this.userType]);
      });
    
    
  }
  submitReport(){
    this.router.navigate(["/basic/DiagReport"], { queryParams: { returnUrl: this.userType }});
  }



  toggleStyle() {
    if (sessionStorage.getItem("StyleMode") == "Light") {
      this.curStyle = "Dark";
      this.styleSwitch.switchStyle("Dark");
      this.navMode=this.curStyle=="Dark"?this.navStyles.Dark:this.navStyles.Light;         
      sessionStorage.setItem("StyleMode", "Dark");
    } else {
      this.curStyle = "Light";
      this.styleSwitch.switchStyle("Light");
      this.navMode=this.curStyle=="Dark"?this.navStyles.Dark:this.navStyles.Light;
      sessionStorage.setItem("StyleMode", "Light");
    }
  }

}
