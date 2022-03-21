import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPayPalComponent } from './payment-pay-pal.component';

describe('PaymentPayPalComponent', () => {
  let component: PaymentPayPalComponent;
  let fixture: ComponentFixture<PaymentPayPalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPayPalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPayPalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
