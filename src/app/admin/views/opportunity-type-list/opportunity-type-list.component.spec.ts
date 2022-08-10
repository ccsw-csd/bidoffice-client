import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityTypeListComponent } from './opportunity-type-list.component';

describe('OpportunityTypeListComponent', () => {
  let component: OpportunityTypeListComponent;
  let fixture: ComponentFixture<OpportunityTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
