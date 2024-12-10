import { MultiChoiceAnswer, MultiChoiceQuestion } from "../quiz/quiz-types";
import { Response } from "../quiz/quiz-types";


export interface Outcome{
    id?:number;
    username: string | null;
    response: Response;
    score?: number;
    isPassed?: boolean;
    UserId?: number;
    QuizId?: number;

    showDetails?: boolean;
}
