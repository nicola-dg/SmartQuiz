import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../partials/navbar/navbar.component";
import { Quiz } from '../../services/quiz/quiz-types';
import { AuthService } from '../../services/auth/auth.service';
import { QuizService } from '../../services/quiz/QuizService';
import { CommonModule } from '@angular/common';
import { McQuizCardComponent } from "../partials/mc-quiz-card/mc-quiz-card.component";
import { ButtonComponent } from "../partials/button/button.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule, McQuizCardComponent, ButtonComponent, RouterModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {

  authService = inject(AuthService);
  quizService = inject(QuizService);


  private _username: string | null = this.authService.getUser();
  public get username(): string | null {
    return this._username;
  }
  public set username(value: string | null) {
    this._username = value;
  }

  private _quizzes: Quiz[] = [];
  public get quizzes(): Quiz[] {
    return this._quizzes;
  }
  public set quizzes(value: Quiz[]) {
    this._quizzes = value;
  }


  ngOnInit(){
    this.quizService.getAllQuiz().subscribe({
      next: (quizzes: Quiz[]) => this.quizzes = quizzes
    })
  }
}
