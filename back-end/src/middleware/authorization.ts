import { NextFunction, Request, Response } from "express";
import AuthController from "../controllers/AuthController.js";
import { todo } from "node:test";

interface AuthRequest extends Request {
  username?: string;
  userId?: number;
}

export function enforceAuthentication( req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) {
    next({ status: 401, message: "Unauthorized" });
    return;
  }
  AuthController.isTokenValid(token, (err, decodedToken: any) => {
    if (err) {
      next({ status: 401, message: "Unauthorized" });
    } else {
      req.username = decodedToken.user;
      req.body.userId = decodedToken.userId;
      next();
    }
  });
}

export async function ensureUsersModifyOnlyOwnQuiz(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.body.userId;
  const quizId = +req.params.id;
  const userHasPermission = await AuthController.canUserModifyQuiz(
    quizId,
    userId
  );
  if (userHasPermission) {
    next();
  } else {
    next({
      status: 403,
      message:
        "Forbidden! You do not have permissions to view or modify this resource",
    });
  }
}


export async function ensureUsersModifyOnlyOwnNotifications(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.body.userId;
  const outcomeId = +req.params.outcomeId;
  const userHasPermission = await AuthController.canUserDeleteNotification(
    outcomeId,
    userId
  );
  if (userHasPermission) {
    next();
  } else {
    next({
      status: 403,
      message:
        "Forbidden! You do not have permissions to view or modify this notification",
    });
  }
}

