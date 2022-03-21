import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayTranchTaskComponent } from './pay-tranch-task.component';

describe('PayTranchTaskComponent', () => {
  let component: PayTranchTaskComponent;
  let fixture: ComponentFixture<PayTranchTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayTranchTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayTranchTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
