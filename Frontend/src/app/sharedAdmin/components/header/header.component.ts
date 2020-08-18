import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@/_UMservices/authentication.service';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router,
    private service: AuthenticationService) { }

  ngOnInit(): void {
  }
/**
 * @name toggleSideBar
 * @description Emits an event to signal the side bar opening
 *              or closing
 *
 * @memberof HeaderComponent
 */
toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      )
    }, 300)
  }
  
  logout() {
    this.service.logout()
    this.router.navigateByUrl('')
  }
  goBasic() {
    this.router.navigateByUrl('')
  }
}
