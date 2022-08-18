import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeListComponent } from './project-type-list.component';

describe('ProjectTypeListComponent', () => {
  let component: ProjectTypeListComponent;
  let fixture: ComponentFixture<ProjectTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
