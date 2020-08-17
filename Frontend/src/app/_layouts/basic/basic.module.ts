import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponent } from './basic.component';
import { RouterModule } from '@angular/router';
import { DiagReportComponent } from '@/diag-report/diag-report.component';

import { WebcamModule } from 'ngx-webcam';




// Material imports

import {MatGridListModule} from '@angular/material/grid-list';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LayoutModule} from '@angular/cdk/layout';
import { MatButtonModule } from "@angular/material/button";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { SharedModule } from '@/sharedBasic/shared.module';
import {MatSidenavModule,} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MapReportComponent } from '@/map-report/map-report.component';


@NgModule({
  declarations: [
    BasicComponent,
    DiagReportComponent,
    MapReportComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,   
    MatGridListModule,
    FlexLayoutModule,
    LayoutModule,
    MatButtonModule,
    MatButtonToggleModule,
    SharedModule,
    WebcamModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatTooltipModule,
    MatButtonModule,
  ],
})
export class BasicModule { }
