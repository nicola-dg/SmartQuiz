import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MultiChoiceAnswer, MultiChoiceQuestion } from '../../../../services/quiz/quiz-types';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../../partials/button/button.component";

@Component({
  selector: 'app-multi-choice-question',
  standalone: true,
  imports: [FormsModule, CommonModule, ButtonComponent],
  templateUrl: './multi-choice-question.component.html',
  styleUrl: './multi-choice-question.component.scss'
})
export class MultiChoiceQuestionComponent {

  private readonly _MAX_ANSWERS = 4;
  @Output() questionToEmit = new EventEmitter<MultiChoiceQuestion>();
  @Output() questionToUpdateEmit = new EventEmitter<MultiChoiceQuestion>();
  @Output() showModalToEmit = new EventEmitter<boolean>();
  @Input()  question!: MultiChoiceQuestion | null;
  private _questionCopy: MultiChoiceQuestion | null = null;
  @Input() showModal: boolean = false;
  private _newQuestion: MultiChoiceQuestion = { "question": "", "MultiChoiceAnswers": [{ "answer": "", "isCorrect": false }, { "answer": "", "isCorrect": false }], "type": 'multichoice' };
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes['question']){
      if (this.question) {
        this.questionCopy = JSON.parse(JSON.stringify(this.question));
      }else{
        this.questionCopy = null;
      }
    }
  }
  
  public get questionCopy(): MultiChoiceQuestion | null {
    return this._questionCopy;
  }

  public set questionCopy(value: MultiChoiceQuestion | null) {
    this._questionCopy = value;
  }
  
  public get newQuestion(): MultiChoiceQuestion {
    return this._newQuestion;
  }
  
  public set newQuestion(value: MultiChoiceQuestion) {
    this._newQuestion = value;
  }
  
  public get MAX_ANSWERS() {
    return this._MAX_ANSWERS;
  }

  private getTargetQuestion(){
    return this.questionCopy ?? this.newQuestion;
  }


  private resetDirtyTouched(form: NgForm) {
    Object.keys(form.controls).forEach(controlName => {
      const control = form.controls[controlName];
      control.markAsPristine();
      control.markAsUntouched();
    });
  }


  toggleVisibility(){
    this.showModal = !this.showModal;
    this.emitVisibility();
  }
  
  clear(){
    this.newQuestion = { "question": "", "MultiChoiceAnswers": [{ "answer": "", "isCorrect": false }, { "answer": "", "isCorrect": false }], "type": 'multichoice' };
  }

  addAnswerField(){
    const targetQuestion : MultiChoiceQuestion = this.getTargetQuestion();
    if(!this.isMaxAnswerReached()){
      targetQuestion.MultiChoiceAnswers.push({"answer":"", "isCorrect":false})
    }
  }

  emitVisibility(){
    this.showModalToEmit.emit(this.showModal);
  }

  isMaxAnswerReached() : boolean{
    const targetQuestion : MultiChoiceQuestion = this.getTargetQuestion();
    return targetQuestion.MultiChoiceAnswers.length >= this.MAX_ANSWERS;
  }

  hasMinimumValidAnswers(): boolean {
    const targetQuestion : MultiChoiceQuestion = this.getTargetQuestion();
    const validAnswers = targetQuestion.MultiChoiceAnswers.filter(answer => answer.answer && answer.answer.trim().length > 0);
    return validAnswers.length >= 2;
  }

  setCorrectAnswer(answer: MultiChoiceAnswer){
    const targetQuestion : MultiChoiceQuestion = this.getTargetQuestion();
    targetQuestion.MultiChoiceAnswers.forEach(ans => {ans == answer ? ans.isCorrect = true : ans.isCorrect = false});
  }

  emitUpdateToParent(form: NgForm){
    if(this.question && this.questionCopy && form.valid && this.hasMinimumValidAnswers() && this.hasCorrectAnswerSelected()){
      this.question.question = this.questionCopy.question;
      this.question.MultiChoiceAnswers = this.questionCopy.MultiChoiceAnswers.filter(answer => answer.answer && answer.answer.trim().length > 0);
      this.questionToUpdateEmit.emit(this.question);
      this.toggleVisibility();
      this.resetDirtyTouched(form);
    }
  }
  
  
  emitToParent(form: NgForm){
    if(form.valid && this.hasMinimumValidAnswers() && this.hasCorrectAnswerSelected()){
      this.newQuestion.MultiChoiceAnswers = this.newQuestion.MultiChoiceAnswers.filter(answer => answer.answer && answer.answer.trim().length > 0)
      this.questionToEmit.emit(JSON.parse(JSON.stringify(this.newQuestion)));
      this.toggleVisibility();
      this.resetForm(form);
    }
  }

  hasCorrectAnswerSelected() : boolean{
    const targetQuestion : MultiChoiceQuestion = this.getTargetQuestion();
    return targetQuestion.MultiChoiceAnswers.some((ans) => ans.isCorrect && ans.answer.trim().length > 0);
  }

  resetForm(form: NgForm){
   form.resetForm();  
   this.clear();
  }

}

