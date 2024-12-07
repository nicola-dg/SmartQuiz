var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Jwt from "jsonwebtoken";
import { User, Quiz, Outcome } from "../models/Database.js";
import { createHash } from "crypto";
const secret = process.env.TOKEN_SECRET || "V3RY_S3CR37_T0K3N";
class AuthController {
    static checkCredentials(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.body;
            let hashedPassword = createHash("sha256").update(user.password).digest("hex");
            const found = yield User.findOne({
                where: {
                    username: user.username,
                    email: user.email,
                    password: hashedPassword,
                },
            });
            if (found) {
                req.body.userId = found.id;
                return true;
            }
            return false;
        });
    }
    static saveUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.body;
            return User.create(Object.assign({}, user));
        });
    }
    static issueToken(user) {
        return Jwt.sign(user, secret, { expiresIn: "24h" });
    }
    static isTokenValid(token, callback) {
        Jwt.verify(token, secret, callback);
    }
    static canUserModifyQuiz(quizId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const quiz = (yield Quiz.findByPk(quizId));
            return quiz !== null && quiz.UserId === userId;
        });
    }
    static canUserDeleteNotification(outcomeId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const outcome = yield Outcome.findByPk(outcomeId);
            console.log(outcome);
            console.log(userId);
            return outcome !== null && outcome.UserId === userId;
        });
    }
}
export default AuthController;
