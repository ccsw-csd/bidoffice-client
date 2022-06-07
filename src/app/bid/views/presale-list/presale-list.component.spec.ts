import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresaleListComponent } from './presale-list.component';

describe('PresaleListComponent', () => {
  let component: PresaleListComponent;
  let fixture: ComponentFixture<PresaleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresaleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresaleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
