var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { database } from "../models/Database.js";
function saveQuizMultiplo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let quiz = yield database.models.QuizRispostaMultipla.create({
                titolo: "quanto fa 2+2",
                descrizione: "calcolare il risultato e fornire la risposta esatta",
                numMaxErrori: 0,
                link: "http://mylinktoquiz",
                risposteMultiple: JSON.stringify([2, 4, 6, 8]),
                rispostaCorretta: "4"
            });
            let jsonQuiz = yield quiz.toJSON();
            console.log('User saved successfully:', jsonQuiz);
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
function findAllQuizMultipli() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let quizMultipli = yield database.models.QuizRispostaMultipla.findAll();
            console.log('All quiz multipli:', quizMultipli.map(quiz => quiz.toJSON()));
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Esegui le operazioni
            yield saveQuizMultiplo();
            yield findAllQuizMultipli();
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
main();
