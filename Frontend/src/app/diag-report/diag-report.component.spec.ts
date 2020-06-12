import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagReportComponent } from './diag-report.component';

describe('DiagReportComponent', () => {
  let component: DiagReportComponent;
  let fixture: ComponentFixture<DiagReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
