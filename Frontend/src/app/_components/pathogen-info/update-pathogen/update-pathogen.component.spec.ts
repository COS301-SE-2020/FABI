import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePathogenComponent } from './update-pathogen.component';

describe('UpdatePathogenComponent', () => {
  let component: UpdatePathogenComponent;
  let fixture: ComponentFixture<UpdatePathogenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePathogenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePathogenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
