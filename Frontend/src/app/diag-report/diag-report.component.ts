import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-diag-report',
  templateUrl: './diag-report.component.html',
  styleUrls: ['./diag-report.component.css']
})
export class DiagReportComponent implements OnInit {
  diagForm: FormGroup;
  today : number = Date.now();

  constructor(private formBuilder: FormBuilder) {
   }

  ngOnInit(): void {
    this.diagForm = this.formBuilder.group({
      Date: ['', Validators.required],
      Location: ['', Validators.required]
  });
  }

}
