import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeatilsProjectPaymentComponent } from './deatils-project-payment.component';

describe('DeatilsProjectPaymentComponent', () => {
  let component: DeatilsProjectPaymentComponent;
  let fixture: ComponentFixture<DeatilsProjectPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeatilsProjectPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeatilsProjectPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
