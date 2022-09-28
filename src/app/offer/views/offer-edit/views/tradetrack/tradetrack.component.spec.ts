import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradetrackComponent } from './tradetrack.component';

describe('TradetrackComponent', () => {
  let component: TradetrackComponent;
  let fixture: ComponentFixture<TradetrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradetrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradetrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
