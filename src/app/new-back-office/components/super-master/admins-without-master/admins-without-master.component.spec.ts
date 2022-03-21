import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsWithoutMasterComponent } from './admins-without-master.component';

describe('AdminsWithoutMasterComponent', () => {
  let component: AdminsWithoutMasterComponent;
  let fixture: ComponentFixture<AdminsWithoutMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsWithoutMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsWithoutMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
