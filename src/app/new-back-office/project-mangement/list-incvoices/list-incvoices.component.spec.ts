import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIncvoicesComponent } from './list-incvoices.component';

describe('ListIncvoicesComponent', () => {
  let component: ListIncvoicesComponent;
  let fixture: ComponentFixture<ListIncvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIncvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIncvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
