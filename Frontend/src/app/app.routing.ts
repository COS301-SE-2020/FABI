import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_helpers/auth.guard';
import { from } from 'rxjs';
import { DiagReportComponent } from './diag-report/diag-report.component';
import { MapReportComponent } from './map-report/map-report.component';
import { AdminComponent } from './_layouts/admin/admin.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { PestInfoComponent } from './_component/pest-info/pest-info.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'DiagReport', component: DiagReportComponent, canActivate: [AuthGuard] },
    { path: 'MapReport', component: MapReportComponent, canActivate: [AuthGuard]},
    {
        path: 'admin',
        component: AdminComponent,
        children: [{
            path: '',
            component: DashboardComponent
        },
        {
            path: 'pests',
            component: PestInfoComponent
        }], 
        // canActivate: [AuthGuard]
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);