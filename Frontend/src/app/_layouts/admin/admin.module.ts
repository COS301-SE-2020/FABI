/*
 * File Name: admin.module.ts
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
 * Related Requirements           : Reporting subsystem
 * Classes in this file           : None
 * Related Documents              : None
 * 
 * Notes:
 *            Version:            : 0.0.0
 *            Author:             : Steven Jordaan - steven.j.jordaan2000@gmail.com
 *            Creation Date:      : Tuesday, July 14th 2020, 9:24:43 am
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 2020-07-15-11-48-am	  SJ	Added coding standards
 * 
 * Functional Description         : This module handles all imports for admin users
 * Constraints                    : User must be an admin
 * Assumptions                    : Used on a desktop device, not scalable to mobile devices
 */



// Angular specifc imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

// Material specific imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon'
// Admin related components
import { AdminComponent } from './admin.component';
import { DashboardComponent } from '@/_components/dashboard/dashboard.component';
import { DashboardService } from '@/_components/dashboard.service';
import { PestInfoComponent } from '@/_components/pest-info/pest-info.component';
import { UpdatePestComponent } from '../../_components/pest-info/update-pest/update-pest.component';

// Shared module
import { SharedModule } from '@/sharedAdmin/shared.module';
import { AlertService } from '@/_services/alert.service';
import { AlertComponent } from '@/_components/alert.component';
import { PathogenInfoComponent } from '../../_components/pathogen-info/pathogen-info.component';
import { UpdatePathogenComponent } from '../../_components/pathogen-info/update-pathogen/update-pathogen.component';
import { UsersComponent } from '../../_components/users/users.component';
import { AutomatedComponent } from '../../_components/automated/automated.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    PestInfoComponent,
    UpdatePestComponent,
    AlertComponent,
    PathogenInfoComponent,
    UpdatePathogenComponent,
    UsersComponent,
    AutomatedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    HighchartsChartModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    DashboardService,
    AlertService
  ]
})
export class AdminModule { }
