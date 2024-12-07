var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import AuthController from '../controllers/AuthController.js';
const AuthenticationRouter = express.Router();
AuthenticationRouter.post("/auth", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let isAuthenticated = yield AuthController.checkCredentials(req, res);
        if (isAuthenticated) {
            res.json(AuthController.issueToken({ username: req.body.username, userId: req.body.userId }));
        }
        else {
            res.status(401).json({ error: "Invalid credentials. Try again." });
        }
    }
    catch (error) {
        next(error);
    }
}));
AuthenticationRouter.post("/signup", (req, res, next) => {
    AuthController.saveUser(req, res).then((user) => {
        res.json(user);
    }).catch((err) => {
        next(err);
    });
});
export default AuthenticationRouter;
