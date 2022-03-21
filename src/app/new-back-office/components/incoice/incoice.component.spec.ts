import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncoiceComponent } from './incoice.component';

describe('IncoiceComponent', () => {
  let component: IncoiceComponent;
  let fixture: ComponentFixture<IncoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
