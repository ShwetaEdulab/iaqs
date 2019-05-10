import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteApplicationComponent } from './institute-application.component';

describe('InstituteApplicationComponent', () => {
  let component: InstituteApplicationComponent;
  let fixture: ComponentFixture<InstituteApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
