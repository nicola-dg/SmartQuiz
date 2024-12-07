    import { Request, Response } from "express";
    import {Quiz, MultiChoiceQuestion, MultiChoiceAnswer, Outcome, OpenEndedQuestion} from "../models/Database.js"
    import { stringify } from "querystring";
    import { OpenEndedAnswer, QuizWithRelations } from "../types/types.js";
    import { QuizResponse } from "../types/types.js";




    class QuizController {

        
        

        static async saveQuiz(req: Request, res: Response): Promise<Quiz>{
            const q = req.body as Quiz;
            return Quiz.create({...q});
        }
        
        static async getAllQuiz(req: Request, res: Response): Promise<Quiz[]> {
            const userId = req.body.userId;
            return Quiz.findAll({
                where: { UserId: userId }  
            });
        }
        
        static async getQuizById(req: Request) : Promise<QuizWithRelations>{
            const found = await Quiz.findByPk(req.params.id ,{
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
        }) as QuizWithRelations;  
        if(found){
            return found;
        }
        throw new Error("Quiz not found.")
        }

        static async updateQuizMultiChoice(req: Request, res: Response) : Promise<Quiz>{
            const quiz = req.body as Quiz;
            const quizToUpdate = await Quiz.findByPk(quiz.id);
            if (quizToUpdate) {
                quizToUpdate.set({...quiz});
                return quizToUpdate.save();
            }
            throw new Error("Error while updating quiz\nerror quiz id: " + quiz.id);
        }

        static async getMultiChoiceQuestions(req: Request) : Promise<MultiChoiceQuestion[]>{
            const quizId = req.params.id;
            return MultiChoiceQuestion.findAll({
                where:{
                    QuizId: quizId
                }
            })
        }
        
        static async saveMultiChoiceQuestion(req: Request, res: Response) : Promise<MultiChoiceQuestion>{
            const q = req.body as MultiChoiceQuestion;
            return MultiChoiceQuestion.create({...q})
        }

        static async saveMultiChoiceAnswer(req: Request, res: Response) : Promise<MultiChoiceAnswer>{
            const a = req.body as MultiChoiceAnswer;
            return MultiChoiceAnswer.create({...a})
        }
        
        
        
        static async getFullQuizById(id: number) : Promise<QuizWithRelations>{
            const found = await Quiz.findByPk(id ,{
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
            }) as QuizWithRelations;  
            if(found){
                return found;
            }
            throw new Error("Quiz not found.")
        }
        
        static async getMultiChoiceAnswer(req: Request) : Promise<MultiChoiceAnswer[]>{
            const questionId = req.params.id;
            return MultiChoiceAnswer.findAll({
                where:{
                    MultiChoiceQuestionId: questionId
                }
            })
        }
        
        static async getOutcomes(req: Request) : Promise<Outcome[]>{
            const quizId = req.params.id;
            // Fetch all outcomes for the given quizId
            const outcomes = await Outcome.findAll({
                where: {
                    QuizId: quizId
                }
            });
            
            // Parse the 'responses' field before returning the outcomes
            outcomes.forEach((outcome: Outcome) => {
                outcome.response = JSON.parse(outcome.response);
            });
            
            return outcomes;
        }
        
        static async saveOutcome(req: Request) : Promise<Outcome>{

            const outcome = req.body;
            const computedOutcome : Outcome = await this.computeOutcome(outcome);
            return Outcome.create({...computedOutcome})
        }


        private static async computeOutcome(outcome: any) : Promise<any>{

                const correctMultiChoiceAnswers = await MultiChoiceAnswer.findAll({
                    where:{
                        QuizId : outcome.QuizId,
                        isCorrect: true
                    }
                })

                const OpenEndedQuestions = await OpenEndedQuestion.findAll({
                    attributes:['correctAnswer'],
                    where: {
                        QuizId: outcome.QuizId
                    }
                })

                const correctOpenEndedAnswers = OpenEndedQuestions.map((question) => question.correctAnswer);
                


                const userResponse : QuizResponse = outcome.response;
                console.log("user response: " + JSON.stringify(userResponse))

                const quiz : Quiz | null = await Quiz.findOne({
                    where: {
                        id: outcome.QuizId
                    }
                })

                let score = 0;
                let errors = 0;
                for (const mcAns of userResponse.selectedMultiChoiceAnswers) {
                    const correctAnswer = correctMultiChoiceAnswers.find(answer => answer.id === mcAns.id);
                    if (correctAnswer){
                        score ++;
                        mcAns.isCorrect = true;
                    }else{
                        errors ++;
                    }
                }

                for (const oeAns of userResponse.selectedOpenEndedAnswers) {
                    const correctAnswer = correctOpenEndedAnswers.find(answer => answer === oeAns.answer);
                    if (correctAnswer){
                        score ++;
                        oeAns.isCorrect = true;
                    }else{
                        errors ++;
                    }

                }

            const isPassed = errors <= (quiz?.maxErrorNumber ?? 0);

            // Aggiorna il risultato 
            outcome.isPassed = isPassed;
            outcome.score = score;
            outcome.response = JSON.stringify(outcome.response);

                
                
            // Restituisce il risultato aggiornato
            return outcome;
        }
        
        
        static async saveOpenEndedQuestion(req: Request, res: Response) : Promise<OpenEndedQuestion>{
            const q = req.body as OpenEndedQuestion;
            return OpenEndedQuestion.create({...q, "QuizId": q.QuizId})
        }
        
        

        
    }

    export default QuizController;