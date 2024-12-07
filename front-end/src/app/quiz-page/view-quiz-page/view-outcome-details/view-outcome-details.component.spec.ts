import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOutcomeDetailsComponent } from './view-outcome-details.component';

describe('ViewOutcomeDetailsComponent', () => {
  let component: ViewOutcomeDetailsComponent;
  let fixture: ComponentFixture<ViewOutcomeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOutcomeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewOutcomeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
