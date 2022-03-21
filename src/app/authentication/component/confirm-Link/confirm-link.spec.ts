import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLinkComponent } from './confirm-link.component';

describe('ConfirmPhoneNumberComponent', () => {
  let component: ConfirmLinkComponent;
  let fixture: ComponentFixture<ConfirmLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
