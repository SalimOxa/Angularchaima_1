import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjectWithoutAdminComponent } from './list-project-without-admin.component';

describe('ListProjectWithoutAdminComponent', () => {
  let component: ListProjectWithoutAdminComponent;
  let fixture: ComponentFixture<ListProjectWithoutAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProjectWithoutAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjectWithoutAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
