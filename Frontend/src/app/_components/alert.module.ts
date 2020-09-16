import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertComponent} from '@/_components/alert.component';
import { AlertService } from '@/_services/alert.service';


@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule
  ],
  providers: [
    AlertService
  ],
  exports:[AlertComponent]
})
export class AlertModule { }
