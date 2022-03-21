import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaymentProjectComponent } from './list-payment-project.component';

describe('ListPaymentProjectComponent', () => {
  let component: ListPaymentProjectComponent;
  let fixture: ComponentFixture<ListPaymentProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPaymentProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPaymentProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
