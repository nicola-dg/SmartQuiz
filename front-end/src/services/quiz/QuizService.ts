import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MultiChoiceAnswer,
  MultiChoiceQuestion,
  OpenEndedQuestion,
  Quiz,
  QuizWithRelations,
} from './quiz-types';
import { RestBackendService } from '../backend/RestBackendService';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService extends RestBackendService {


  createMultiChoiceAnswer(answer: MultiChoiceAnswer) : Observable<MultiChoiceAnswer> {
    const url = `${this.url}/quiz/answer/multichoice`;
    return this.httpClient.post<MultiChoiceAnswer>(url, answer, this.httpOptions);
  }

  createMultiChoiceQuestion(question: MultiChoiceQuestion) : Observable<MultiChoiceQuestion> {
    const url = `${this.url}/quiz/question/multichoice`;
    return this.httpClient.post<MultiChoiceQuestion>(url, question, this.httpOptions);
  }

  createQuiz(quiz: Quiz): Observable<Quiz> {
    const url = `${this.url}/quiz`;
    return this.httpClient.post<Quiz>(url, quiz, this.httpOptions);
  }

  getAllQuiz(): Observable<Quiz[]> {
    const url = `${this.url}/quiz`;
    return this.httpClient.get<Quiz[]>(url, this.httpOptions);
  }

  getQuizById(id: number): Observable<QuizWithRelations> {
    const url = `${this.url}/quiz/${id}`;
    return this.httpClient.get<QuizWithRelations>(url, this.httpOptions);
  }

  getMultiChoiceAnswers(question: MultiChoiceQuestion): Observable<MultiChoiceAnswer[]> {
    const url = `${this.url}/quiz/question/${question.id}/answers`;
    return this.httpClient.get<MultiChoiceAnswer[]>(url, this.httpOptions);
  }


  getMultiChoiceQuestions(quiz: Quiz): Observable<MultiChoiceQuestion[]> {
    const url = `${this.url}/quiz/${quiz.id}/questions`;
    return this.httpClient.get<MultiChoiceQuestion[]>(url, this.httpOptions);
  }

  updateQuizMultiChoice(quiz: Quiz): Observable<Quiz> {
    const url = `${this.url}/quiz/${quiz.id}`;
    return this.httpClient.put<Quiz>(url, quiz, this.httpOptions);
  }


  createOpenEndedQuestion(question : OpenEndedQuestion) : Observable<OpenEndedQuestion>{
    const url = `${this.url}/quiz/question/openended`;
    return this.httpClient.post<OpenEndedQuestion>(url, question, this.httpOptions);
  }
}
