
import express, { NextFunction, Request, Response } from 'express'
import AuthController from '../controllers/AuthController.js';

const AuthenticationRouter = express.Router();

AuthenticationRouter.post("/auth", async (req: Request, res: Response, next: NextFunction) => {
    try {
      let isAuthenticated: boolean = await AuthController.checkCredentials(req, res);
      
      if (isAuthenticated) {
          res.json(AuthController.issueToken({ username: req.body.username, userId: req.body.userId }));
      } else {
          res.status(401).json({ error: "Invalid credentials. Try again." });
      }
    } catch (error) {
       next(error); 
    }
  });

AuthenticationRouter.post("/signup", (req: Request, res: Response, next: NextFunction) => {
    AuthController.saveUser(req, res).then((user) => {
      res.json(user);
    }).catch((err) => {
      next(err);
    })

  });


export default AuthenticationRouter;