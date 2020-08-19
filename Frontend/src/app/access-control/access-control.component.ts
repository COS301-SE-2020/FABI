import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@/_UMservices/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.component.html',
  styleUrls: ['./access-control.component.css']
})
export class AccessControlComponent implements OnInit {
  userType="";

  constructor(
    private auth:AuthenticationService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.auth.getUserType(this.auth.currentUserValue).subscribe(data=>{
      this.userType=data;
    });
  }

  returnTo(){
    this.auth.getUserType(this.auth.currentUserValue).subscribe(data=>{
      this.router.navigate(["/"+data]);    
    });
  }

}
