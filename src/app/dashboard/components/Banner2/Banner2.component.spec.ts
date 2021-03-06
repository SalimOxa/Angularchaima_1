import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Banner2Component } from './Banner2.component';

describe('Middle6Component', () => {
  let component: Banner2Component;
  let fixture: ComponentFixture<Banner2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Banner2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Banner2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
