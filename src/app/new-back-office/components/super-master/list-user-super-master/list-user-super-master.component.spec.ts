import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserSuperMasterComponent } from './list-user-super-master.component';

describe('ListUserSuperMasterComponent', () => {
  let component: ListUserSuperMasterComponent;
  let fixture: ComponentFixture<ListUserSuperMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserSuperMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserSuperMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
