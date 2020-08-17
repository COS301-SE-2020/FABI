import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';

// Material imports

import {MatGridListModule} from '@angular/material/grid-list';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LayoutModule} from '@angular/cdk/layout';
import { MatButtonModule } from "@angular/material/button";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

// General imports

import { NgImageSliderModule } from 'ng-image-slider';




@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatGridListModule,
    FlexLayoutModule,
    LayoutModule,
    MatButtonModule,
    MatButtonToggleModule,
    NgbModule,
    OverlayModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    NgImageSliderModule
  ]
})
export class HomeModule { }
