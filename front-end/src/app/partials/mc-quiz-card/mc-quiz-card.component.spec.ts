import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McQuizCardComponent } from './mc-quiz-card.component';

describe('McQuizCardComponent', () => {
  let component: McQuizCardComponent;
  let fixture: ComponentFixture<McQuizCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McQuizCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(McQuizCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
