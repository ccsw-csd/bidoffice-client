import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HyperscalerComponent } from './hyperscaler.component';

describe('HyperscalerComponent', () => {
  let component: HyperscalerComponent;
  let fixture: ComponentFixture<HyperscalerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HyperscalerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HyperscalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
