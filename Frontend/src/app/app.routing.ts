/*
 * File Name: app.routing.ts
 * 
 * The University of Pretoria
 * Computer Science Department
 * FABI-Surveillance
 * Runtime Terrors
 * 
 * (c) Copyright 2020 University of Pretoria
 * ALL RIGHTS RESERVED
 * 
 * Input                          : None
 * Output                         : None
 * Related Requirements           : None
 * Classes in this file           : None
 * Related Documents              : None
 * 
 * Notes:
 *            Version:            : 0.1.0
 *            Author:             : Steven Jordaan - steven.j.jordaan2000@gmail.com
 *            Creation Date:      : Sunday, July 5th 2020, 5:28:23 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 2020-07-21-09-47-am	  SJ	Added admin pathogen routes
 * 2020-07-15-11-08-am	  SJ	Added coding standards
 * 
 * Functional Description         : Routing is handled, if path is routed to, a component is displayed
 * Constraints                    : None
 * Assumptions                    : User has internet access
 */




// Angular specific imports
import { Routes, RouterModule, CanActivate } from '@angular/router';

// User Management imports
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccessControlComponent } from '@/access-control/access-control.component';

// Admin User imports
import { AdminComponent } from './_layouts/admin/admin.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { PestInfoComponent } from './_components/pest-info/pest-info.component';
import { UpdatePestComponent } from './_components/pest-info/update-pest/update-pest.component';
import {AuthGuard} from "@/_helpers/auth.guard"

// Basic User imports
import { BasicComponent } from './_layouts/basic/basic.component';
import { HomeComponent } from './home/home.component';
import { DiagReportComponent } from './diag-report/diag-report.component';
import { MapReportComponent } from './map-report/map-report.component';
import { PathogenInfoComponent } from './_components/pathogen-info/pathogen-info.component';
import { UpdatePathogenComponent } from './_components/pathogen-info/update-pathogen/update-pathogen.component';

// Specialist User imports
import { SpecSearchComponent } from './spec-search/spec-search.component';
import { UsersComponent } from './_components/users/users.component';
import { AutomatedComponent } from './_components/automated/automated.component';
import {DiagnoseReportComponent} from '@/diagnose-report/diagnose-report.component'

/*
*   Comment out AuthGuard during development for easier testing
*/
const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [{
            path: '',
            component: DashboardComponent
        },
        {
            path: 'pests',
            component: PestInfoComponent,
        },
        {
            path: 'updatePest/:id',
            component: UpdatePestComponent
        },
        {
            path: 'pathogens',
            component: PathogenInfoComponent,
        },
        {
            path: 'updatePathogen/:id',
            component: UpdatePathogenComponent
        },
        {
            path: 'users',
            component: UsersComponent
        },
        {
            path: 'auto',
            component: AutomatedComponent
        }],
        // canActivate: ([AuthGuard]),
        // data:{
        //     expectedRole:"admin"
        // }
    },
    {
        path: 'basic',
        component: BasicComponent,
        children: [{
            path: '',
            component: HomeComponent
        },
        {
            path: 'DiagReport',
            component: DiagReportComponent
        },
        {
            path: 'MapReport',
            component: MapReportComponent
        }]
    },
    {
        path: 'special',
        component: SpecSearchComponent,
        canActivate: ([AuthGuard]),
        data:{
            expectedRole:["special",'admin']
        }
    },
    {
        path: 'diagnose',
        component: DiagnoseReportComponent,
        // canActivate: ([AuthGuard]),
        // data:{
        //     expectedRole:["special",'admin']
        // }
    },
        
        {
            path: '**',
            redirectTo: 'login'
        }
    
];

export const appRoutingModule = RouterModule.forRoot(routes);