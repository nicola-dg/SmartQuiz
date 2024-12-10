
import express, { NextFunction, Request, Response } from "express";
import QuizController from "../controllers/QuizController.js";
import { Outcome, Quiz } from "../models/Database.js";



const QuizRouterOpen = express.Router();


QuizRouterOpen.get("/:id", async (req: Request, res: Response, next: NextFunction) =>{
    QuizController.getQuizById(req).then((quiz: Quiz) => res.json(quiz)
    ).catch((err) => next(err));
})

QuizRouterOpen.post("/outcome", async (req: Request, res: Response, next: NextFunction) =>{
    QuizController.saveOutcome(req).then((outcome: Outcome) => res.json(outcome)
    ).catch((err) => next(err));
})



export default QuizRouterOpen;