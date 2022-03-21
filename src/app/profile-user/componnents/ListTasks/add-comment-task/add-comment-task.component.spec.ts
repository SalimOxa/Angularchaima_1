import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentTaskComponent } from './add-comment-task.component';

describe('AddCommentTaskComponent', () => {
  let component: AddCommentTaskComponent;
  let fixture: ComponentFixture<AddCommentTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCommentTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommentTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
