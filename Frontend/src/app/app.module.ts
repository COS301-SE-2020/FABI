import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';
import {WebcamModule} from 'ngx-webcam';
import { appRoutingModule } from './app.routing';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components/alert.component';
import { DiagReportComponent } from './diag-report/diag-report.component';
import { GraphQLModule } from './graphql.module';
import {FormsModule} from '@angular/forms';
import { Http,HttpModule , Response } from '@angular/http';
import { MapReportComponent } from './map-report/map-report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './_layouts/admin/admin.module';
import { BasicModule } from './_layouts/basic/basic.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    DiagReportComponent,
    MapReportComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BasicModule,
    HttpClientModule,
    appRoutingModule,
    FormsModule,
    GraphQLModule,
    WebcamModule,
    HttpModule,
    BrowserAnimationsModule,
    AdminModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
