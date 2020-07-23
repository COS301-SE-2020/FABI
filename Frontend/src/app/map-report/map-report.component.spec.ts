import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapReportComponent } from './map-report.component';

describe('MapReportComponent', () => {
  let component: MapReportComponent;
  let fixture: ComponentFixture<MapReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
