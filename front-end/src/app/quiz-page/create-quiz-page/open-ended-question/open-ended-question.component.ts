import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { OpenEndedQuestion } from '../../../../services/quiz/quiz-types';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../../partials/button/button.component";

@Component({
  selector: 'app-open-ended-question',
  standalone: true,
  imports: [FormsModule, CommonModule, ButtonComponent],
  templateUrl: './open-ended-question.component.html',
  styleUrl: './open-ended-question.component.scss'
})
export class OpenEndedQuestionComponent {

  @Input() question : OpenEndedQuestion | null = null;
  @Input() showModal: boolean = false;
  private _questionCopy: OpenEndedQuestion | null = null;
  @Output() questionToEmit = new EventEmitter<OpenEndedQuestion>();
  @Output() questionToUpdateEmit = new EventEmitter<OpenEndedQuestion>();
  @Output() showModalToEmit = new EventEmitter<boolean>();
  private _newQuestion: OpenEndedQuestion = { "question": "", "type": 'openended', "correctAnswer": "", "answer":""};

  public get newQuestion(): OpenEndedQuestion {
    return this._newQuestion;
  }
  
  public set newQuestion(value: OpenEndedQuestion) {
    this._newQuestion = value;
  }

  public get questionCopy(): OpenEndedQuestion | null {
    return this._questionCopy;
  }

  public set questionCopy(value: OpenEndedQuestion | null) {
    this._questionCopy = value;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['question']){
      if (this.question) {
        this.questionCopy = JSON.parse(JSON.stringify(this.question));
      }else{
        this.questionCopy = null;
      }
    }
  }

  emitVisibility(){
    this.showModalToEmit.emit(this.showModal);
  }

  toggleVisibility(){
    this.showModal = !this.showModal;
    this.emitVisibility();
  }

  emitUpdateToParent(form: NgForm){
    if(this.question && this.questionCopy && form.valid){
      this.question.question = this.questionCopy.question;
      this.question.correctAnswer = this.questionCopy.correctAnswer;
      this.questionToUpdateEmit.emit(this.question);
      this.toggleVisibility();
      this.resetForm(form);
    }
  }

  emitToParent(form: NgForm){
    if(form.valid){
      this.questionToEmit.emit(JSON.parse(JSON.stringify(this.newQuestion)));
      this.toggleVisibility();
      this.resetForm(form)
      return
    }
  }

  resetForm(form: NgForm){
    form.resetForm();
   }
 
  
  private getTargetQuestion(){
    return this.questionCopy ?? this.newQuestion;
  }
  
}
