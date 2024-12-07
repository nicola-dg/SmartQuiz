var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AuthController from "../controllers/AuthController.js";
export function enforceAuthentication(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    if (!token) {
        next({ status: 401, message: "Unauthorized" });
        return;
    }
    AuthController.isTokenValid(token, (err, decodedToken) => {
        if (err) {
            next({ status: 401, message: "Unauthorized" });
        }
        else {
            req.username = decodedToken.user;
            req.body.userId = decodedToken.userId;
            next();
        }
    });
}
export function ensureUsersModifyOnlyOwnQuiz(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.body.userId;
        const quizId = +req.params.id;
        const userHasPermission = yield AuthController.canUserModifyQuiz(quizId, userId);
        if (userHasPermission) {
            next();
        }
        else {
            next({
                status: 403,
                message: "Forbidden! You do not have permissions to view or modify this resource",
            });
        }
    });
}
export function ensureUsersModifyOnlyOwnNotifications(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.body.userId;
        const outcomeId = +req.params.outcomeId;
        const userHasPermission = yield AuthController.canUserDeleteNotification(outcomeId, userId);
        if (userHasPermission) {
            next();
        }
        else {
            next({
                status: 403,
                message: "Forbidden! You do not have permissions to view or modify this notification",
            });
        }
    });
}
