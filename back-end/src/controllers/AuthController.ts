import { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { User, Quiz, Outcome } from "../models/Database.js"
import { createHash } from "crypto";
import {Notification} from "../models/Database.js";

const secret: string = process.env.TOKEN_SECRET || "V3RY_S3CR37_T0K3N";

interface AuthRequestBody {
  username: string;
  email: string;
  password: string;
}

class AuthController {


  static async checkCredentials(req: Request, res: Response): Promise<boolean> {
    
    let user : AuthRequestBody = req.body as AuthRequestBody;
    let hashedPassword = createHash("sha256").update(user.password).digest("hex");

    const found = await User.findOne({
      where: {
        username: user.username ,
        email: user.email,
        password: hashedPassword,
      },
    });

    if (found) {
      req.body.userId = found.id;
      return true;
    }

    return false;
  }

  static async saveUser(req: Request, res: Response): Promise<User> {
    let user = req.body as AuthRequestBody;
    return User.create({...user});
  }

  static issueToken(user: object): string {
    return Jwt.sign(user, secret, { expiresIn: "24h" });
  }

  static isTokenValid(token: string, callback: Jwt.VerifyCallback): void {
    Jwt.verify(token, secret, callback);
  }

  static async canUserModifyQuiz(
    quizId: number,
    userId: number
  ): Promise<boolean> {
    const quiz = (await Quiz.findByPk(
      quizId
    )) as Quiz | null;
    return quiz !== null && quiz.UserId === userId;
  }


  static async canUserDeleteNotification(outcomeId: number, userId: number): Promise<boolean>{
    const outcome = await Outcome.findByPk(outcomeId);
    console.log(outcome);
    console.log(userId);
    return outcome !== null && outcome.UserId === userId;
  }
}

export default AuthController;
