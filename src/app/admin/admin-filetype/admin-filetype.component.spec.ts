import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFiletypeComponent } from './admin-filetype.component';

describe('AdminFiletypeComponent', () => {
  let component: AdminFiletypeComponent;
  let fixture: ComponentFixture<AdminFiletypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFiletypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFiletypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
