import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { DiagReportComponent } from './diag-report.component';
import { Apollo } from 'apollo-angular';
import { FormBuilder } from '@angular/forms';

describe('DiagReportComponent', () => {
  let component: DiagReportComponent;
  let fixture: ComponentFixture<DiagReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule],
      providers: [Apollo, FormBuilder],
      declarations: [ DiagReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
