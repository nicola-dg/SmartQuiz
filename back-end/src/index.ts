import express, { NextFunction, Request, Response } from "express"
import AuthenticationRouter from "./routers/AuthenticationRouter.js";
import { DatabaseError, UniqueConstraintError } from "sequelize";
import  cors  from "cors";
import QuizRouter from "./routers/QuizRouter.js";
import { enforceAuthentication } from "./middleware/authorization.js";
import NotificationRouter from "./routers/NotificationRouter.js";
import UserRouter from "./routers/UserRouter.js";
import QuizRouterOpen from "./routers/QuizRouterOpen.js";
import UserRouterOpen from "./routers/UserRouterOpen.js";
import NotificationRouterOpen from "./routers/NotificationRouterOpen.js";


const app = express();
const PORT = 3000;


app.use(express.json());
app.use(cors());
app.use(AuthenticationRouter);
app.use('/quiz', QuizRouterOpen);
app.use(UserRouterOpen);
app.use(NotificationRouterOpen);
app.use(enforceAuthentication);
app.use(UserRouter);
app.use('/quiz', QuizRouter);
app.use(NotificationRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof UniqueConstraintError) {
    return res.status(400).json({
      error: 'Errore nella richiesta',
      message: "Unique constraint violation."
    });
  } else if (err instanceof DatabaseError) {
    return res.status(400).json({
      error: 'Errore nella richiesta',
      message: "Errore di database"
    });
  } else {
    return res.status(500).json({
      error: 'Errore interno del server',
      message: err.message || 'Si è verificato un errore interno.'
    });
  }
});


  
app.listen(3000);
console.log("server listening on port 3000");