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
const QuizRouterOpen = express.Router();
QuizRouterOpen.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    QuizController.getQuizById(req).then((quiz) => res.json(quiz)).catch((err) => next(err));
}));
QuizRouterOpen.post("/outcome", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    QuizController.saveOutcome(req).then((outcome) => res.json(outcome)).catch((err) => next(err));
}));
export default QuizRouterOpen;
