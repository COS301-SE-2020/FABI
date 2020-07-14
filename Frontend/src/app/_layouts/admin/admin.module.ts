import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from '@/_components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PestInfoComponent } from '@/_components/pest-info/pest-info.component';
import { SharedModule } from '@/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';

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
    MatDividerModule
  ]
})
export class AdminModule { }
