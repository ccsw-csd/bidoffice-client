import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionStatusComponent } from './option-status.component';

describe('OptionStatusComponent', () => {
  let component: OptionStatusComponent;
  let fixture: ComponentFixture<OptionStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
