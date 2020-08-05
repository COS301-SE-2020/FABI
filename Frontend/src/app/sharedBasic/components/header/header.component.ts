import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@/_services/authentication.service';
import { User } from '@/_models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  DeviceType = localStorage.getItem("DeviceType");
  curStyle = localStorage.getItem("StyleMode");
  colour=this.curStyle=="Dark"?"white":"black";
  navStyles={"Dark":"navbar-dark bg-dark","Light":"navbar-light bg-light"};
  navMode=this.curStyle=="Dark"?this.navStyles.Dark:this.navStyles.Light;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }





  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  toggleStyle() {
    if (localStorage.getItem("StyleMode") == "Light") {
      this.curStyle = "Dark";  
      this.navMode=this.curStyle=="Dark"?this.navStyles.Dark:this.navStyles.Light;         
      localStorage.setItem("StyleMode", "Dark");
    } else {
      this.curStyle = "Light";
      this.navMode=this.curStyle=="Dark"?this.navStyles.Dark:this.navStyles.Light;
      localStorage.setItem("StyleMode", "Light");
    }
  }

}
