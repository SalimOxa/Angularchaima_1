import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownoaldStatementTaskComponent } from './downoald-statement-task.component';

// @ts-ignore
describe('DownoaldStatementTaskComponent', () => {
  let component: DownoaldStatementTaskComponent;
  let fixture: ComponentFixture<DownoaldStatementTaskComponent>;

  // @ts-ignore
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownoaldStatementTaskComponent ]
    })
    .compileComponents();
  });

  // @ts-ignore
  beforeEach(() => {
    fixture = TestBed.createComponent(DownoaldStatementTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // @ts-ignore
  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
