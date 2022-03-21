import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNotficationrBackOfficeComponent } from './list-notficationr-back-office.component';

describe('ListNotficationrBackOfficeComponent', () => {
  let component: ListNotficationrBackOfficeComponent;
  let fixture: ComponentFixture<ListNotficationrBackOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNotficationrBackOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNotficationrBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
