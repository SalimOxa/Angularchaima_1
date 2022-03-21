import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTranchesPayementsComponent } from './list-tranches-payements.component';

describe('ListTranchesPayementsComponent', () => {
  let component: ListTranchesPayementsComponent;
  let fixture: ComponentFixture<ListTranchesPayementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTranchesPayementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTranchesPayementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
