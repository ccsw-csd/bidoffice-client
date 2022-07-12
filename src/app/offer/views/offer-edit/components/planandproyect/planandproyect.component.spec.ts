import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanandproyectComponent } from './planandproyect.component';

describe('PlanandproyectComponent', () => {
  let component: PlanandproyectComponent;
  let fixture: ComponentFixture<PlanandproyectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanandproyectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanandproyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
