import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactRacineComponent } from './contact-racine.component';

describe('ContactRacineComponent', () => {
  let component: ContactRacineComponent;
  let fixture: ComponentFixture<ContactRacineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactRacineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactRacineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
