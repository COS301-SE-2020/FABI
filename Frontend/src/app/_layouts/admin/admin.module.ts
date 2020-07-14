import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from '@/_components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PestInfoComponent } from '@/_component/pest-info/pest-info.component';
import { SharedModule } from '@/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';


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
    MatSidenavModule
  ]
})
export class AdminModule { }
