import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HyperscalerEditComponent } from './hyperscaler-edit.component';

describe('HyperscalerEditComponent', () => {
  let component: HyperscalerEditComponent;
  let fixture: ComponentFixture<HyperscalerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HyperscalerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HyperscalerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
