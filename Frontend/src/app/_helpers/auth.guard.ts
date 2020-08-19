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
import { sha256 } from 'js-sha256';
import { AlertService } from '@/_services/alert.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        const currentUserType = this.authenticationService.currentUserTypeValue;
        var login = this.router.getCurrentNavigation().extras.state;
        
        if(login!=undefined)if(login["login"]){
            if (currentUser) {
                return true;
            }
        }

        if(currentUserType!=null){
            for(var i=0;i<route.data.expectedRole.length;i++){
                if (currentUser&&currentUserType==sha256(route.data.expectedRole[i])) {
                return true;
            }
            }
            
            this.alertService.error("You dont have access to there!",true)
            this.router.navigate(['/noaccess']);
            return false;
            
        }
        


        // Not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}