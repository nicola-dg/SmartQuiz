import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NavbarComponent } from '../../partials/navbar/navbar.component';
import { MarkdownModule } from 'ngx-markdown';
import { Router } from '@angular/router';
import { QuizService } from '../../../services/quiz/QuizService';
import { MultiChoiceAnswer, MultiChoiceQuestion, OpenEndedQuestion, Question, Quiz } from '../../../services/quiz/quiz-types';
import { MultiChoiceQuestionComponent } from './multi-choice-question/multi-choice-question.component';
import { AuthService } from '../../../services/auth/auth.service';
import { OpenEndedQuestionComponent } from "./open-ended-question/open-ended-question.component";
import { ToastrService } from 'ngx-toastr';
import { ButtonComponent } from "../../partials/button/button.component";

@Component({
  selector: 'app-create-quiz-page',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent, MarkdownModule, MultiChoiceQuestionComponent, OpenEndedQuestionComponent, ButtonComponent],
  templateUrl: './create-quiz-page.component.html',
  styleUrl: './create-quiz-page.component.scss',
})
export class CreateQuizPageComponent {


  private _quiz: Quiz = {"title" : "", "description" : "", "maxErrorNumber" : undefined};
  private _questions: Question[] = [];
  private quizService = inject(QuizService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private _showMultiChoiceModal: boolean = false;
  private _showOpenEndedModal: boolean = false;
  private readonly MAX_QUESTIONS = 4;
  private _questionMultiChoiceToChild : MultiChoiceQuestion | null = null;
  private _questionOpenEnededToChild: OpenEndedQuestion | null = null;
  
  public get showOpenEndedModal(): boolean {
    return this._showOpenEndedModal;
  }
  public set showOpenEndedModal(value: boolean) {
    this._showOpenEndedModal = value;
  }

  public get questionOpenEnededToChild(): OpenEndedQuestion | null {
    return this._questionOpenEnededToChild;
  }
  public set questionOpenEnededToChild(value: OpenEndedQuestion | null) {
    this._questionOpenEnededToChild = value;
  }

  public get questionMultiChoiceToChild(): MultiChoiceQuestion | null{
    return this._questionMultiChoiceToChild;
  }

  public set questionMultiChoiceToChild(value: MultiChoiceQuestion | null) {
    this._questionMultiChoiceToChild = value;
  }

  public get showMultiChoiceModal(): boolean {
    return this._showMultiChoiceModal;
  }
  public set showMultiChoiceModal(value: boolean) {
    this._showMultiChoiceModal = value;
  }

  public get questions(): Question[] {
    return this._questions;
  }
  public set questions(value: Question[]) {
    this._questions = value;
  }

  public get quiz(): Quiz {
    return this._quiz;
  }
  public set quiz(value: Quiz) {
    this._quiz = value;
  }

  resetQuestionMultiChoiceToChild(){
    this.questionMultiChoiceToChild = null;
  }

  resetQuestionOpenEndedToChild(){
    this.questionOpenEnededToChild = null;
  }

  toggleMultiChoiceVisibility(){
    this.showMultiChoiceModal = !this.showMultiChoiceModal;
  }

  toggleOpenEndedVisibility(){
    this.showOpenEndedModal = !this.showOpenEndedModal;
  }

  onQuestionReceived(question: Question){
    this.questions.push(question);
  }

  onMultiChoiceVisibilityReceived(){
    this.toggleMultiChoiceVisibility()
  }

  onOpenEndedVisibilityReceived(){
    this.toggleOpenEndedVisibility()
  }

  modifyMultiChoiceQuestion(question: MultiChoiceQuestion){
    this.questionMultiChoiceToChild = question;
    this.toggleMultiChoiceVisibility();
  }

  modifyOpenEndedQuestion(question: OpenEndedQuestion){
    this.questionOpenEnededToChild = question;
    this.toggleOpenEndedVisibility();
  }


  deleteQuestion(question: Question){
    this.questions = this.questions.filter((q : Question) => q!=question)
  }

  onQuestionReceivedUpdate(question: Question) {
    this.questions = this.questions.map((q: Question) => q === question ? question : JSON.parse(JSON.stringify(q)));
    this.questionMultiChoiceToChild = null;
  }

  hasAtLeastOneQuestion()  : boolean{
    return this.questions.length > 0; 
  }

  onSubmit(form: NgForm): void {
    if(form.valid && this.hasAtLeastOneQuestion()){
      this.createQuiz(form);
    }
  }

  
  private createQuiz(form: NgForm) {
    this.quizService.createQuiz({
      ...this.quiz,
      "UserId": Number(this.authService.getUserId())
    }).subscribe({
      next: (quiz: Quiz) => {
        this.updateQuizWithLink(quiz);
        for (const question of this.questions) {
          this.createQuestion(question, quiz);
        }
      },
      error: (err: Error) => console.error(err),
      complete : () => {form.resetForm(); this.router.navigate(["/dash"]); this.toastr.success("quiz successfully created","Quiz Created")}
    });
  }

  private createQuestion(question: Question, quiz: Quiz){
    if('MultiChoiceAnswers' in question){
      this.createMultiChoiceQuestion(question, quiz);
    }else{
      this.createOpenEndedQuestion(question, quiz); 
    }
  }

  private createOpenEndedQuestion(question: OpenEndedQuestion, quiz: Quiz){
    this.quizService.createOpenEndedQuestion({ ...question, "QuizId": quiz.id }).subscribe({
      error: (err: Error) => console.error(err)
    })
  }

  private createMultiChoiceQuestion(question: MultiChoiceQuestion, quiz: Quiz) {
    this.quizService.createMultiChoiceQuestion({ ...question, "QuizId": quiz.id }).subscribe({
      next: (retrivedQuestion: MultiChoiceQuestion) => {
        for (const answer of question.MultiChoiceAnswers) {
          this.createAnswers(answer, question, retrivedQuestion);
        }
      },
        error: (err: Error) => console.error(err)
    });
  }

  private createAnswers(answer: MultiChoiceAnswer, q: MultiChoiceQuestion, retrivedQuestion: MultiChoiceQuestion) {
    this.quizService.createMultiChoiceAnswer({ ...answer, "QuizId":retrivedQuestion.QuizId, "MultiChoiceQuestionId": retrivedQuestion.id }).subscribe({
      error: (err: Error) => console.error(err)
    });
  }

  private updateQuizWithLink(quiz: Quiz) {
    const link = `http://localhost:4200/quiz/${quiz.title}/${quiz.id}`
    quiz.link = link;
    this.quizService.updateQuizMultiChoice(quiz).subscribe({
      error: (err: Error) => console.error(err)
    });
  }
}
