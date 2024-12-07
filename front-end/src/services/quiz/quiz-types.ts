export interface Quiz {
  id?: number;
  title: string;
  description: string;
  maxErrorNumber: number | undefined;
  questions?: MultiChoiceQuestion[];
  link?: string;
  UserId?: number;
}

export interface MultiChoiceQuestion{
  type: 'multichoice'
  id?: number;
  question: string;
  MultiChoiceAnswers: MultiChoiceAnswer[];
  QuizId?: number;
}

export interface MultiChoiceAnswer {
  id?: number;
  answer: string;
  isCorrect: boolean;
  MultiChoiceQuestionId?: number;
  QuizId?: number;
}

export interface OpenEndedAnswer {
  answer: string;
  isCorrect?: boolean;
}

export interface OpenEndedQuestion {
  type: 'openended'
  id?: number;
  question: string;
  answer: string;
  correctAnswer: string;
  QuizId?: number;
}

export interface QuizWithRelations extends Quiz {
  MultiChoiceQuestions: MultiChoiceQuestion[];
  OpenEndedQuestions: OpenEndedQuestion[];
}

export type Question = MultiChoiceQuestion | OpenEndedQuestion;

export interface Response {
  QuizId: number;
  selectedMultiChoiceAnswers: MultiChoiceAnswer[];
  selectedOpenEndedAnswers: OpenEndedAnswer[];
}


