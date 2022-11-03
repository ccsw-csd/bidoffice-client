import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradetrackEditComponent } from './tradetrack-edit.component';

describe('TradetrackEditComponent', () => {
  let component: TradetrackEditComponent;
  let fixture: ComponentFixture<TradetrackEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradetrackEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradetrackEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
