import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  MultiChoiceAnswer,
  MultiChoiceQuestion,
  Quiz,
  QuizWithRelations,
} from '../../../services/quiz/quiz-types';
import { User } from '../../../services/user/user-types';
import { QuizService } from '../../../services/quiz/QuizService';
import { OpenUser, UserService } from '../../../services/user/userService';
import { OutcomeService } from '../../../services/outcome/OutcomeService';
import { AuthService } from '../../../services/auth/auth.service';
import { Outcome } from '../../../services/outcome/outcome-types';
import { NotificationService } from '../../../services/notification/NotificationService';
import { Response } from '../../../services/quiz/quiz-types';
import { routes } from '../../app.routes';
import { NavbarComponent } from '../../partials/navbar/navbar.component';
import { ToastrService } from 'ngx-toastr';
import { ButtonComponent } from '../../partials/button/button.component';

@Component({
  selector: 'app-take-quiz-page',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    NavbarComponent,
    ButtonComponent,
  ],
  templateUrl: './take-quiz-page.component.html',
  styleUrl: './take-quiz-page.component.scss',
})
export class TakeQuizPageComponent {
  private _quiz: QuizWithRelations | null = null;
  private _creator: string | null = null;
  private _response: Response = {
    QuizId: 0,
    selectedMultiChoiceAnswers: [],
    selectedOpenEndedAnswers: [],
  };
  private _outcome: Outcome | null = null;
  private _showChooseNameModal: boolean = false;
  private _username: string | null = null;
  private _usernameError: string | null = null;
  private _chooseNameError: string | null = null;
  public get chooseNameError(): string | null {
    return this._chooseNameError;
  }
  public set chooseNameError(value: string | null) {
    this._chooseNameError = value;
  }
  public get usernameError(): string | null {
    return this._usernameError;
  }
  public set usernameError(value: string | null) {
    this._usernameError = value;
  }


  @ViewChild('responseForm') responseForm!: NgForm;

  buttonUsername: string = "Anonymous";
  routerService = inject(Router);
  toastr = inject(ToastrService);

  public get username(): string | null {
    return this._username;
  }
  public set username(value: string | null) {
    this._username = value;
  }

  public get showChooseNameModal(): boolean {
    return this._showChooseNameModal;
  }
  public set showChooseNameModal(value: boolean) {
    this._showChooseNameModal = value;
  }

  public get response(): Response {
    return this._response;
  }
  public set response(value: Response) {
    this._response = value;
  }

  public get outcome(): Outcome | null {
    return this._outcome;
  }
  public set outcome(value: Outcome | null) {
    this._outcome = value;
  }

  public get quiz(): QuizWithRelations | null {
    return this._quiz;
  }
  public set quiz(value: QuizWithRelations | null) {
    this._quiz = value;
  }
  public get creator(): string | null {
    return this._creator;
  }
  public set creator(value: string | null) {
    this._creator = value;
  }

  quizService = inject(QuizService);
  userService = inject(UserService);
  outcomeService = inject(OutcomeService);
  authService = inject(AuthService);
  notificationService = inject(NotificationService);

  constructor(private activatedRoute: ActivatedRoute) {
    if(this.authService.getUser()){
      this.buttonUsername = this.authService.getUser()!;
    }
  }

  private getCreator() {
    if (this.quiz!.UserId) {
      this.userService.getOpenUserById(this.quiz!.UserId).subscribe({
        next: (retrivedUser: OpenUser) =>
          (this.creator = retrivedUser.username),
        error: (err) => console.error(err),
      });
    }
  }

  private getQuiz() {
    this.quizService
      .getQuizById(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (retrievedQuiz: QuizWithRelations) => {
          if (retrievedQuiz) {
            this.quiz = retrievedQuiz;
            this.initResponse();
            this.getCreator();
          }
        },
        error: () => console.error('quiz not found'),
      });
  }

  private initResponse() {
    if (this.quiz) {
      this.response = {
        QuizId: this.quiz.id || 0,
        selectedMultiChoiceAnswers: [],
        selectedOpenEndedAnswers: this.quiz.OpenEndedQuestions.map(() => ({
          answer: '',
          isCorrect: false,
        })),
      };
    }
  }

  ngOnInit() {
    this.getQuiz();
  }

  private getUsername(): string | null {
    return this.authService.getUser() || this.username;
  }

   toggleChooseNameModal() {
    this.showChooseNameModal = !this.showChooseNameModal;
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.quiz) {
      if(!this.username) this.username = "Anonymous";
      this.outcomeService
        .createOutcome({
          QuizId: this.quiz.id,
          username: this.getUsername(),
          response: this.response,
          UserId: this.quiz.UserId
        })
        .subscribe({
          next: (retrivedOutcome: Outcome) => {
            this.notificationService
              .createNotification({
                quizTitle: this.quiz!.title,
                responderUserName: this.getUsername(),
                UserId: this.quiz?.UserId,
                OutcomeId: retrivedOutcome.id,
                QuizId: this.quiz?.id,
              })
              .subscribe();
          },
          error: (err: Error) => console.error(err),
          complete: () => {
            this.routerService.navigate(['/dash']);
            form.resetForm();
            this.toastr.success(
              'quiz successfully submitted',
              'Quiz submitted'
            );
          },
        });
    }
  }

  chooseNameClicked(){
    if(this.responseForm.valid){
      this.toggleChooseNameModal();
    }else{
      this.chooseNameError = "Please answer all questions before choosing a name."
    }
  }

  stayAnonymousClicked(){
    this.username = "Anonymous"
    this.onSubmit(this.responseForm);
    this.toggleChooseNameModal();
    this.usernameError = null;
  }
  
  saveNameClicked(){
    if(this.username){
      this.onSubmit(this.responseForm);
      this.toggleChooseNameModal()
      this.usernameError = null;
    }
    else{
      this.usernameError = "please select an username or keep anonimate"
    }
  }
}
