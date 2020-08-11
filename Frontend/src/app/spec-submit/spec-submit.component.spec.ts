import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecSubmitComponent } from './spec-submit.component';

describe('SpecSubmitComponent', () => {
  let component: SpecSubmitComponent;
  let fixture: ComponentFixture<SpecSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
