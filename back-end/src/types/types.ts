import MultiChoiceAnswer from "../models/MultiChoiceAnswer";
import MultiChoiceQuestion from "../models/MultiChoiceQuestion";
import OpenEndedQuestion from "../models/OpenEndedQuestion";
import Quiz from "../models/Quiz";




export interface QuizWithRelations extends Quiz {
    MultiChoiceQuestions: MultiChoiceQuestionWithAnswers[];
    OpenEndedQuestions: OpenEndedQuestion[];
  }
  
export interface MultiChoiceQuestionWithAnswers extends MultiChoiceQuestion{
    MultiChoiceAnswers: MultiChoiceAnswer[];
}


export interface OpenEndedAnswer {
    answer: string;
    isCorrect: boolean;
  }
  

export interface QuizResponse {
    QuizId: number;
    selectedMultiChoiceAnswers: MultiChoiceAnswer[];
    selectedOpenEndedAnswers: OpenEndedAnswer[];
  }
  