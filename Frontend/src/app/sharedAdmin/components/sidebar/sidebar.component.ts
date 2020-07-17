import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@/_services/authentication.service';
import { User } from '@/_models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: User

  constructor(private service: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.service.currentUserValue
  }

}
