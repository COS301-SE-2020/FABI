/*
 * File Name: auth.guard.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : User details
 * Output                         : Boolean if user has access
 * Related Requirements           : R1. Register, R2. Login
 * Classes in this file           : None
 * Related Documents              : None
 * 
 * Notes:
 *            Version:            : 0.1.0
 *            Author:             : Steven Jordaan - steven.j.jordaan2000@gmail.com
 *            Creation Date:      : Tuesday, June 9th 2020, 12:54:18 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 2020-07-15-11-14-am	  SJ	Added coding standards
 * 
 * Functional Description         : Used to ensure current user is authorised for action
 * Constraints                    : None
 * Assumptions                    : User is attempting to access a different URL
 */



// Angular specific imports
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Service imports
import { AuthenticationService } from '@/_UMservices/authentication.service';
import { AlertService } from '@/_services/alert.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    user="Undecided";
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) { 
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        
        this.authenticationService.getUserType(currentUser).subscribe(data=>{
            this.user = data;
        });
        var login = this.router.getCurrentNavigation().extras.state;
        if(login!=undefined)login = login.login;
        
        
        if(login){
            this.user = this.router.getCurrentNavigation().extras.state.userType;
            console.log(this.user);
        }

        if (!currentUser) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }

        if(this.user!="Undecided"){
            for(var i=0;i<route.data.expectedRole.length;i++){
                if (currentUser&&this.user==route.data.expectedRole[i]) {
                return true;
            }
            }
            
            this.alertService.error("You dont have access to there!",true)
            this.router.navigate(['/basic']);
            return false;
            
        }
        else{
            console.log("Authguard",this.user)
            this.router.navigate(['/basic']);
            return false;
        }
        
    }
}