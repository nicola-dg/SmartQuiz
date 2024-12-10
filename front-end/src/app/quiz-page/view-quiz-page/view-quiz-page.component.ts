import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../partials/navbar/navbar.component';
import { Quiz, QuizWithRelations } from '../../../services/quiz/quiz-types';
import { QuizService } from '../../../services/quiz/QuizService';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Outcome } from '../../../services/outcome/outcome-types';
import { OutcomeService } from '../../../services/outcome/OutcomeService';
import { CommonModule } from '@angular/common';
import { ViewOutcomeDetailsComponent } from './view-outcome-details/view-outcome-details.component';
import { MarkdownModule } from 'ngx-markdown';
import { NotificationService } from '../../../services/notification/NotificationService';
import { ButtonComponent } from '../../partials/button/button.component';

@Component({
  selector: 'app-view-quiz-page',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    ViewOutcomeDetailsComponent,
    MarkdownModule,
    ButtonComponent,
    RouterModule,
  ],
  templateUrl: './view-quiz-page.component.html',
  styleUrl: './view-quiz-page.component.scss',
})
export class ViewQuizPageComponent {
  private _quizId: number | undefined = undefined;
  private _quiz: QuizWithRelations | null = null;
  private _outcomes: Outcome[] = [];
  private _showDeatils: boolean = false;
  quizService = inject(QuizService);
  outcomeService = inject(OutcomeService);
  notificationService = inject(NotificationService);

  public get showDeatils(): boolean {
    return this._showDeatils;
  }
  public set showDeatils(value: boolean) {
    this._showDeatils = value;
  }

  public get outcomes(): Outcome[] {
    return this._outcomes;
  }

  public set outcomes(value: Outcome[]) {
    this._outcomes = value;
  }

  public get quiz(): QuizWithRelations | null {
    return this._quiz;
  }

  public set quiz(value: QuizWithRelations | null) {
    this._quiz = value;
  }

  public get quizId(): number | undefined {
    return this._quizId;
  }

  public set quizId(value: number | undefined) {
    this._quizId = value;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.activatedRoute.queryParams.subscribe((params) => {
        const OutcomeId: number | null = Number(params['OutcomeId']);
        if (OutcomeId) {
          const elem = document.getElementById(`outcome-${OutcomeId}`);
          elem?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }, 100);
  }

  toggleDetails(outcome: Outcome) {
    outcome.showDetails = !outcome.showDetails;
  }

  private getQuiz() {
    if (this.quizId) {
      this.quizService.getQuizById(this.quizId).subscribe({
        next: (retrievedQuiz: QuizWithRelations) => {
          if (retrievedQuiz) {
            this.quiz = retrievedQuiz;
            this.outcomeService
              .getOutcomesByQuizId(this.quiz.id || 0)
              .subscribe({
                next: (retrivedOutcomes: Outcome[]) => {
                  this.outcomes = JSON.parse(JSON.stringify(retrivedOutcomes));
                  this.outcomes = this.outcomes.map((retrivedOutcome) => ({
                    ...retrivedOutcome,
                    showDetails: false,
                  }));
                  this.showNotifiedOutcome();
                },
              });
          }
        },
        error: () => console.error('quiz not found'),
      });
    }
  }

  deleteNotification(outcome: Outcome) {
    const outcomeId = outcome.id;
    if (outcomeId) {
      this.notificationService
        .deleteNotificationByOutcomeId(outcomeId)
        .subscribe();
    }
  }

  private showNotifiedOutcome() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const OutcomeId: number | null = Number(params['OutcomeId']);
      if (OutcomeId) {
        const notificatedOutcome: Outcome | undefined = this.outcomes.find(
          (outcome) => outcome.id === OutcomeId
        );
        if (notificatedOutcome) {
          notificatedOutcome.showDetails = true;
          this.notificationService
            .deleteNotificationByOutcomeId(OutcomeId)
            .subscribe();
        }
      }
    });
  }

  private getOutcomes() {
    this.getQuiz();
  }

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.quizId = this.activatedRoute.snapshot.params['id'];
    this.getOutcomes();
  }

  onEmitToggle(outcome: Outcome) {
    this.toggleDetails(outcome);
  }
}
