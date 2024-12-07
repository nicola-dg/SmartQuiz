var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import QuizController from "../controllers/QuizController.js";
import { ensureUsersModifyOnlyOwnQuiz } from "../middleware/authorization.js";
const QuizRouter = express.Router();
QuizRouter.get("", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    QuizController.getAllQuiz(req, res).then((quizs) => res.json(quizs)).catch((err) => next(err));
}));
QuizRouter.get("/:id/question", ensureUsersModifyOnlyOwnQuiz, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    QuizController.getMultiChoiceQuestions(req).then((questions) => res.json(questions)).catch((err) => next(err));
}));
QuizRouter.get("/:id/answer", ensureUsersModifyOnlyOwnQuiz, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    QuizController.getMultiChoiceAnswer(req).then((answers) => res.json(answers)).catch((err) => next(err));
}));
QuizRouter.get("/:id/outcome", ensureUsersModifyOnlyOwnQuiz, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    QuizController.getOutcomes(req).then((outcomes) => res.json(outcomes)).catch((err) => next(err));
}));
QuizRouter.put("/:id", ensureUsersModifyOnlyOwnQuiz, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    QuizController.updateQuizMultiChoice(req, res).then((quiz) => res.json(quiz)).catch((err) => next(err));
}));
QuizRouter.post("", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    QuizController.saveQuiz(req, res).then((quiz) => res.json(quiz)).catch((err) => next(err));
}));
QuizRouter.post("/question/multichoice", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    QuizController.saveMultiChoiceQuestion(req, res).then((question) => res.json(question)).catch((err) => next(err));
}));
QuizRouter.post("/answer/multichoice", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    QuizController.saveMultiChoiceAnswer(req, res).then((answer) => res.json(answer)).catch((err) => next(err));
}));
QuizRouter.post("/question/openended", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    QuizController.saveOpenEndedQuestion(req, res).then((question) => res.json(question)).catch((err) => next(err));
}));
export default QuizRouter;
