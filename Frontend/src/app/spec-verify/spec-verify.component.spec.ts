import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecVerifyComponent } from './spec-verify.component';

describe('SpecVerifyComponent', () => {
  let component: SpecVerifyComponent;
  let fixture: ComponentFixture<SpecVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
