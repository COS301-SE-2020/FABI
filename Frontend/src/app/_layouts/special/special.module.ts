import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialComponent } from './special.component';
import { RouterModule } from '@angular/router';

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
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

// Special helpers
import {SearchReportsComponent} from '@/sharedSpecial/Search/search-reports.component'
import {ViewReportComponent} from '@/sharedSpecial/View/view-report.component'
import { FilterComponent } from '@/sharedSpecial/filter/filter.component';


@NgModule({
  declarations: [
    SpecialComponent,
    SearchReportsComponent,
    ViewReportComponent,
    FilterComponent
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
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    NgbModule,
    MatPaginatorModule,
    MatTableModule
    
  ],
})
export class SpecialModule { }
