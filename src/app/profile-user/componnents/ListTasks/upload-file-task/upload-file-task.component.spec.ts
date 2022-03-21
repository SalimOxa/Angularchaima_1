import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFileTaskComponent } from './upload-file-task.component';

describe('UploadFileTaskComponent', () => {
  let component: UploadFileTaskComponent;
  let fixture: ComponentFixture<UploadFileTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFileTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFileTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
