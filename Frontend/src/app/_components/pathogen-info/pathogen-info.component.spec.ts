import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathogenInfoComponent } from './pathogen-info.component';

describe('PathogenInfoComponent', () => {
  let component: PathogenInfoComponent;
  let fixture: ComponentFixture<PathogenInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathogenInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathogenInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
