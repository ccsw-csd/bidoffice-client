import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationEditComponent } from './documentation-edit.component';

describe('DocumentationEditComponent', () => {
  let component: DocumentationEditComponent;
  let fixture: ComponentFixture<DocumentationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
