import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNotficationComponent } from './list-notfication.component';

describe('ListNotficationComponent', () => {
  let component: ListNotficationComponent;
  let fixture: ComponentFixture<ListNotficationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNotficationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNotficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
