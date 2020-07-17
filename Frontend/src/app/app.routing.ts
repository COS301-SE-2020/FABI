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
 * 2020-07-15-11-08-am	  SJ	Added coding standards
 * 
 * Functional Description         : Routing is handled, if path is routed to, a component is displayed
 * Constraints                    : None
 * Assumptions                    : User has internet access
 */




// Angular specific imports
import { Routes, RouterModule } from '@angular/router';

// User Management imports
import { AuthGuard } from './_helpers/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// Admin User imports
import { AdminComponent } from './_layouts/admin/admin.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { PestInfoComponent } from './_components/pest-info/pest-info.component';
import { UpdatePestComponent } from './_components/pest-info/update-pest/update-pest.component';

// Basic User imports
import { HomeComponent } from './home/home.component';
import { DiagReportComponent } from './diag-report/diag-report.component';
import { MapReportComponent } from './map-report/map-report.component';

/*
*   Comment out AuthGuard during development for easier testing
*/
const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'DiagReport',
        component: DiagReportComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'MapReport',
        component: MapReportComponent,
        canActivate: [AuthGuard]
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
        }],
        canActivate: [AuthGuard]
    },
    // otherwise redirect to home
    {
        path: '**',
        redirectTo: ''
    }
];

export const appRoutingModule = RouterModule.forRoot(routes);