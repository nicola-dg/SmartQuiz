import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuizPageComponent } from './view-quiz-page.component';

describe('ViewQuizPageComponent', () => {
  let component: ViewQuizPageComponent;
  let fixture: ComponentFixture<ViewQuizPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewQuizPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewQuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
