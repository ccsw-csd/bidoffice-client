import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracingEditComponent } from './tracing-edit.component';

describe('TracingEditComponent', () => {
  let component: TracingEditComponent;
  let fixture: ComponentFixture<TracingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TracingEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TracingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
