import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-diag-report',
  templateUrl: './diag-report.component.html',
  styleUrls: ['./diag-report.component.css']
})
export class DiagReportComponent implements OnInit {
  diagForm: FormGroup;
  today : number = Date.now();
  Q1=[];
  Q4 = [];
  Q6=[];
  selectedValue: string = '';

  constructor(private formBuilder: FormBuilder) {
   }

  ngOnInit(): void {
    this.diagForm = this.formBuilder.group({
      Date: ['', Validators.required],
      Location: ['', Validators.required],
      CN: ['', Validators.required],
      SN: [''],
      Cu: [''],
      Q1: [''],
      Q2: [''],
      Q3: [''],
      Q4: [''],
      Q5: [''],
      Q6:['']
  });
  this.Q1 = this.getPlantParts();
  this.Q4 = this.getnumPlants();
  this.Q6 = this.getYNConditional();
  


}

getnumPlants() {
  return [
    { id: 'np1', name: 'One' },
    { id: 'np2', name: 'More than one' }
  ];
}
getPlantParts(){
  return [
    {id: 'pp1', name: 'Root'},
    {id: 'pp2', name: 'Stem'},
    {id: 'pp3', name: 'Branch'},
    {id: 'pp4', name: 'Leaf / Leaves'},
    {id: 'pp5', name: 'Flowers'}
  ];
}
getYNConditional(){
  return [
    {id:"1", name:"Yes"},
    {id:"2", name:"No"}
  ];
}

}
