import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSuperMasterComponent } from './dashboard-super-master.component';

describe('DashboardSuperMasterComponent', () => {
  let component: DashboardSuperMasterComponent;
  let fixture: ComponentFixture<DashboardSuperMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSuperMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSuperMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
