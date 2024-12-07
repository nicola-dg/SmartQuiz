var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Quiz, MultiChoiceQuestion, MultiChoiceAnswer, Outcome, OpenEndedQuestion } from "../models/Database.js";
class QuizController {
    static saveQuiz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = req.body;
            return Quiz.create(Object.assign({}, q));
        });
    }
    static getAllQuiz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.body.userId;
            return Quiz.findAll({
                where: { UserId: userId }
            });
        });
    }
    static getQuizById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield Quiz.findByPk(req.params.id, {
                include: [
                    {
                        model: MultiChoiceQuestion,
                        include: [
                            {
                                model: MultiChoiceAnswer,
                            }
                        ]
                    },
                    {
                        model: OpenEndedQuestion
                    }
                ]
            });
            if (found) {
                return found;
            }
            throw new Error("Quiz not found.");
        });
    }
    static updateQuizMultiChoice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const quiz = req.body;
            const quizToUpdate = yield Quiz.findByPk(quiz.id);
            if (quizToUpdate) {
                quizToUpdate.set(Object.assign({}, quiz));
                return quizToUpdate.save();
            }
            throw new Error("Error while updating quiz\nerror quiz id: " + quiz.id);
        });
    }
    static getMultiChoiceQuestions(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const quizId = req.params.id;
            return MultiChoiceQuestion.findAll({
                where: {
                    QuizId: quizId
                }
            });
        });
    }
    static saveMultiChoiceQuestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = req.body;
            return MultiChoiceQuestion.create(Object.assign({}, q));
        });
    }
    static saveMultiChoiceAnswer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const a = req.body;
            return MultiChoiceAnswer.create(Object.assign({}, a));
        });
    }
    static getFullQuizById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield Quiz.findByPk(id, {
                include: [
                    {
                        model: MultiChoiceQuestion,
                        include: [
                            {
                                model: MultiChoiceAnswer,
                            }
                        ]
                    },
                    {
                        model: OpenEndedQuestion
                    }
                ]
            });
            if (found) {
                return found;
            }
            throw new Error("Quiz not found.");
        });
    }
    static getMultiChoiceAnswer(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const questionId = req.params.id;
            return MultiChoiceAnswer.findAll({
                where: {
                    MultiChoiceQuestionId: questionId
                }
            });
        });
    }
    static getOutcomes(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const quizId = req.params.id;
            // Fetch all outcomes for the given quizId
            const outcomes = yield Outcome.findAll({
                where: {
                    QuizId: quizId
                }
            });
            // Parse the 'responses' field before returning the outcomes
            outcomes.forEach((outcome) => {
                outcome.response = JSON.parse(outcome.response);
            });
            return outcomes;
        });
    }
    static saveOutcome(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const outcome = req.body;
            const computedOutcome = yield this.computeOutcome(outcome);
            return Outcome.create(Object.assign({}, computedOutcome));
        });
    }
    static computeOutcome(outcome) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const correctMultiChoiceAnswers = yield MultiChoiceAnswer.findAll({
                where: {
                    QuizId: outcome.QuizId,
                    isCorrect: true
                }
            });
            const OpenEndedQuestions = yield OpenEndedQuestion.findAll({
                attributes: ['correctAnswer'],
                where: {
                    QuizId: outcome.QuizId
                }
            });
            const correctOpenEndedAnswers = OpenEndedQuestions.map((question) => question.correctAnswer);
            const userResponse = outcome.response;
            console.log("user response: " + JSON.stringify(userResponse));
            const quiz = yield Quiz.findOne({
                where: {
                    id: outcome.QuizId
                }
            });
            let score = 0;
            let errors = 0;
            for (const mcAns of userResponse.selectedMultiChoiceAnswers) {
                const correctAnswer = correctMultiChoiceAnswers.find(answer => answer.id === mcAns.id);
                if (correctAnswer) {
                    score++;
                    mcAns.isCorrect = true;
                }
                else {
                    errors++;
                }
            }
            for (const oeAns of userResponse.selectedOpenEndedAnswers) {
                const correctAnswer = correctOpenEndedAnswers.find(answer => answer === oeAns.answer);
                if (correctAnswer) {
                    score++;
                    oeAns.isCorrect = true;
                }
                else {
                    errors++;
                }
            }
            const isPassed = errors <= ((_a = quiz === null || quiz === void 0 ? void 0 : quiz.maxErrorNumber) !== null && _a !== void 0 ? _a : 0);
            // Aggiorna il risultato 
            outcome.isPassed = isPassed;
            outcome.score = score;
            outcome.response = JSON.stringify(outcome.response);
            // Restituisce il risultato aggiornato
            return outcome;
        });
    }
    static saveOpenEndedQuestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = req.body;
            return OpenEndedQuestion.create(Object.assign(Object.assign({}, q), { "QuizId": q.QuizId }));
        });
    }
}
export default QuizController;
