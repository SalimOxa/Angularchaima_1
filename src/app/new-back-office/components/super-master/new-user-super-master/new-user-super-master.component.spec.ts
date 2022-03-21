import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserSuperMasterComponent } from './new-user-super-master.component';

describe('NewUserSuperMasterComponent', () => {
  let component: NewUserSuperMasterComponent;
  let fixture: ComponentFixture<NewUserSuperMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUserSuperMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserSuperMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
