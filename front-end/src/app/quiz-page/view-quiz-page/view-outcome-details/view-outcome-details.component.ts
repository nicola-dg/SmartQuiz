import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Outcome } from '../../../../services/outcome/outcome-types';
import { NavbarComponent } from "../../../partials/navbar/navbar.component";
import { MultiChoiceAnswer, MultiChoiceQuestion, OpenEndedQuestion, Question, Quiz, QuizWithRelations } from '../../../../services/quiz/quiz-types';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../../partials/button/button.component";

@Component({
  selector: 'app-view-outcome-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ButtonComponent],
  templateUrl: './view-outcome-details.component.html',
  styleUrl: './view-outcome-details.component.scss'
})
export class ViewOutcomeDetailsComponent {

  @Input() outcome : Outcome | null = null;
  @Input() quiz : QuizWithRelations | null = null;
  @Output() emitToggle = new EventEmitter<Outcome>();

  onClickEmitToggle(){
    if(this.outcome){
      this.emitToggle.emit(this.outcome);
    }
  }

  getCorrectMCAnswer(question: MultiChoiceQuestion): string {
    const correctAnswer = question.MultiChoiceAnswers.find(ans => ans.isCorrect);
    return correctAnswer ? correctAnswer.answer : 'No correct answer';
  }

  getCorrectOEAnswer(question: OpenEndedQuestion): string {
    const correctAnswer = question.correctAnswer
    return correctAnswer || 'No correct answer';
  }

}
