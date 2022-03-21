import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBackOfficeComponent } from './header-back-office.component';

describe('HeaderBackOfficeComponent', () => {
  let component: HeaderBackOfficeComponent;
  let fixture: ComponentFixture<HeaderBackOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderBackOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
