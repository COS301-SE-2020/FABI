import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecSearchComponent } from './spec-search.component';

describe('SpecSearchComponent', () => {
  let component: SpecSearchComponent;
  let fixture: ComponentFixture<SpecSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
