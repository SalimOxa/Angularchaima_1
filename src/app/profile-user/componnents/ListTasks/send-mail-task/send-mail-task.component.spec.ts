import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMailTaskComponent } from './send-mail-task.component';

describe('SendMailTaskComponent', () => {
  let component: SendMailTaskComponent;
  let fixture: ComponentFixture<SendMailTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendMailTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMailTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
