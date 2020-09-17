/*
 * File Name: app.module.ts
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
 * Related Documents              : SRS Document
 * 
 * Notes:
 *            Version:            : 0.1.0
 *            Author:             : Steven Jordaan - steven.j.jordaan2000@gmail.com
 *            Creation Date:      : Thursday, July 16th 2020, 6:25:12 pm
 * HISTORY:
 * Date       	          By	Comments
 * -----------	          ---	-----------------------------------------------------
 * 2020-07-21-09-26-am	  SJ	Add coding standards
 * 
 * Functional Description         : Contains all the app's imports and exports
 * Constraints                    : None
 * Assumptions                    : None
 */




import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BasicModule } from './_layouts/basic/basic.module';
import {SpecialModule} from '@/_layouts/special/special.module'

import { LocationStrategy } from '@angular/common';
import { HashLocationStrategy } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';
import { appRoutingModule } from './app.routing';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components/alert.component';
import { GraphQLModule } from './graphql.module';
import { Http, HttpModule, Response } from '@angular/http';
import { MapReportComponent } from './map-report/map-report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './_layouts/admin/admin.module';
import { SpecSearchComponent } from './spec-search/spec-search.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HomeModule} from './home/home.module';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AccessControlComponent } from './access-control/access-control.component';
import { MatTableModule } from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SpecSearchComponent,
    AccessControlComponent,
    MapReportComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BasicModule,
    HttpClientModule,
    appRoutingModule,
    GraphQLModule,
    HttpModule,
    BrowserAnimationsModule,
    AdminModule,
    HomeModule,
    MatTooltipModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    HttpModule,
    MatCardModule,
    FormsModule,
    RouterModule,
    MatSelectModule,
    MatSliderModule,
    MatTableModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatIconModule,   

    // Used to find what device is being used. Found: https://www.npmjs.com/package/ngx-device-detector
    DeviceDetectorModule,

    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide : LocationStrategy , useClass: HashLocationStrategy},
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
