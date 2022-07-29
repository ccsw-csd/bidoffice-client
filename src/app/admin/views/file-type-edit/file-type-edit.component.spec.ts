import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTypeEditComponent } from './file-type-edit.component';

describe('FileTypeEditComponent', () => {
  let component: FileTypeEditComponent;
  let fixture: ComponentFixture<FileTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileTypeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
