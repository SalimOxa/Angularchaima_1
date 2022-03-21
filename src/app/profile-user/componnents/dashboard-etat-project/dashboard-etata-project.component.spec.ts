import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEtataProjectComponent } from './dashboard-etata-project.component';

describe('DashboardEtataProjectComponent', () => {
  let component: DashboardEtataProjectComponent;
  let fixture: ComponentFixture<DashboardEtataProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardEtataProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEtataProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
