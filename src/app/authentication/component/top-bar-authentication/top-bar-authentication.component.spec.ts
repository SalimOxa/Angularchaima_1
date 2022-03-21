import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarAuthenticationComponent } from './top-bar-authentication.component';

describe('TopBarAuthenticationComponent', () => {
  let component: TopBarAuthenticationComponent;
  let fixture: ComponentFixture<TopBarAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBarAuthenticationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
