import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePestComponent } from './update-pest.component';

describe('UpdatePestComponent', () => {
  let component: UpdatePestComponent;
  let fixture: ComponentFixture<UpdatePestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
