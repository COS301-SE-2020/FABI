import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponent } from './basic.component';
import { RouterModule } from '@angular/router';

// Material imports

import {MatGridListModule} from '@angular/material/grid-list';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LayoutModule} from '@angular/cdk/layout';
import { MatButtonModule } from "@angular/material/button";
import {MatButtonToggleModule} from '@angular/material/button-toggle';



@NgModule({
  declarations: [
    BasicComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatGridListModule,
    FlexLayoutModule,
    LayoutModule,
    MatButtonModule,
    MatButtonToggleModule
  ]
})
export class BasicModule { }
