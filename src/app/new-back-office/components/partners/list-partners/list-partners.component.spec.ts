import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPartnersComponent } from './list-partners.component';

describe('ListPartnersComponent', () => {
  let component: ListPartnersComponent;
  let fixture: ComponentFixture<ListPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPartnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
