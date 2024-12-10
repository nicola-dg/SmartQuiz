import { Injectable } from "@angular/core";
import { RestBackendService } from "../backend/RestBackendService";
import { Observable } from "rxjs";
import { Outcome } from "./outcome-types";


@Injectable({
    providedIn: "root"
})
export class OutcomeService extends RestBackendService{

    
    createOutcome(outcome: Outcome) : Observable<Outcome> {
        const url = `${this.url}/quiz/outcome`;
        return this.httpClient.post<Outcome>(url, outcome, this.httpOptions)
    }
    
    getOutcomesByQuizId(quizId: number) : Observable<Outcome[]> {
        const url = `${this.url}/quiz/${quizId}/outcome`;
        return this.httpClient.get<Outcome[]>(url, this.httpOptions)
    }
}