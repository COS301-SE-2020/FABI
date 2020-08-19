import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnoseReportComponent } from './diagnose-report.component';

describe('DiagnoseReportComponent', () => {
  let component: DiagnoseReportComponent;
  let fixture: ComponentFixture<DiagnoseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnoseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnoseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
