
import express, { NextFunction, Request, Response } from "express";
import QuizController from "../controllers/QuizController.js";
import { ensureUsersModifyOnlyOwnQuiz } from "../middleware/authorization.js";
import MultiChoiceQuestion from "../models/MultiChoiceQuestion.js";
import MultiChoiceAnswer from "../models/MultiChoiceAnswer.js";
import Outcome from "../models/Outcome.js";
import Quiz from "../models/Quiz.js";

const QuizRouter = express.Router();

QuizRouter.get("", async (req: Request, res: Response, next: NextFunction) =>{
    QuizController.getAllQuiz(req, res).then((quizs: Quiz[]) => res.json(quizs)
    ).catch((err) => next(err));
})


QuizRouter.get("/:id/question", ensureUsersModifyOnlyOwnQuiz, async (req: Request, res: Response, next: NextFunction) =>{
    QuizController.getMultiChoiceQuestions(req).then((questions: MultiChoiceQuestion[]) => res.json(questions)
    ).catch((err) => next(err));
})

QuizRouter.get("/:id/answer", ensureUsersModifyOnlyOwnQuiz, async (req: Request, res: Response, next: NextFunction) =>{
    QuizController.getMultiChoiceAnswer(req).then((answers: MultiChoiceAnswer[]) => res.json(answers)
    ).catch((err) => next(err));
})

QuizRouter.get("/:id/outcome", ensureUsersModifyOnlyOwnQuiz, async (req: Request, res: Response, next: NextFunction) =>{
    QuizController.getOutcomes(req).then((outcomes: Outcome[]) => res.json(outcomes)
    ).catch((err) => next(err));
})

QuizRouter.put("/:id", ensureUsersModifyOnlyOwnQuiz ,async (req: Request, res: Response, next: NextFunction) =>{
    QuizController.updateQuizMultiChoice(req, res).then((quiz: Quiz) => res.json(quiz)
    ).catch((err) => next(err));
})

QuizRouter.post("", async (req: Request, res: Response, next: NextFunction) =>{
    QuizController.saveQuiz(req, res).then((quiz: Quiz) => res.json(quiz)
    ).catch((err) => next(err));
})

QuizRouter.post("/question/multichoice", async (req: Request, res: Response, next: NextFunction) =>{
    QuizController.saveMultiChoiceQuestion(req, res).then((question: MultiChoiceQuestion) => res.json(question)
    ).catch((err) => next(err));
})

QuizRouter.post("/answer/multichoice", async (req: Request, res: Response, next: NextFunction) =>{
    QuizController.saveMultiChoiceAnswer(req, res).then((answer: MultiChoiceAnswer) => res.json(answer)
    ).catch((err) => next(err));
})


QuizRouter.post("/question/openended", async (req: Request, res: Response, next: NextFunction) =>{
    QuizController.saveOpenEndedQuestion(req, res).then((question: MultiChoiceQuestion) => res.json(question)
    ).catch((err) => next(err));
})



export default QuizRouter
