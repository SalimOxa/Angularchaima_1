import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmByPhoneNumberComponent } from './confirm-by-phone-number.component';

describe('ConfirmByPhoneNumberComponent', () => {
  let component: ConfirmByPhoneNumberComponent;
  let fixture: ComponentFixture<ConfirmByPhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmByPhoneNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmByPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
