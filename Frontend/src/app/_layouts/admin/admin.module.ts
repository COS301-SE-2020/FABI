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

// Admin related components
import { AdminComponent } from './admin.component';
import { DashboardComponent } from '@/_components/dashboard/dashboard.component';
import { PestInfoComponent } from '@/_components/pest-info/pest-info.component';
import { DashboardService } from '@/_components/dashboard.service';

// Shared module
import { SharedModule } from '@/shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    PestInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [
    DashboardService
  ]
})
export class AdminModule { }
