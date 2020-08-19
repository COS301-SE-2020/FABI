import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomatedComponent } from './automated.component';

describe('AutomatedComponent', () => {
  let component: AutomatedComponent;
  let fixture: ComponentFixture<AutomatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
