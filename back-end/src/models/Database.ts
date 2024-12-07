import sequelize from "./DatabaseConnection.js";
import User from "./User.js";
import OpenEndedQuestion from "./OpenEndedQuestion.js";
import Outcome from "./Outcome.js";
import Notification from "./Notification.js";
import MultiChoiceQuestion from "./MultiChoiceQuestion.js";
import MultiChoiceAnswer from "./MultiChoiceAnswer.js";
import Quiz from "./Quiz.js";

User.hasMany(Notification);
User.hasMany(Outcome);
User.hasMany(Quiz);

Notification.belongsTo(User);

Outcome.belongsTo(User);
Outcome.belongsTo(Quiz);

Quiz.belongsTo(User);
Quiz.hasMany(Outcome);
Quiz.hasMany(OpenEndedQuestion);
Quiz.hasMany(MultiChoiceQuestion);
Quiz.hasMany(MultiChoiceAnswer);
Quiz.hasMany(Notification);

Quiz.belongsTo(User);

OpenEndedQuestion.belongsTo(Quiz);

MultiChoiceQuestion.belongsTo(Quiz);
MultiChoiceQuestion.hasMany(MultiChoiceAnswer);

MultiChoiceAnswer.belongsTo(MultiChoiceQuestion);
MultiChoiceAnswer.belongsTo(Quiz);

Outcome.hasOne(Notification);

sequelize.sync().then( () => {
    console.log("Database synced correctly");
  }).catch( err => {
    console.error("Error with database synchronization: " + err.message);
  });


export {
    sequelize,
    User,
    Quiz,
    OpenEndedQuestion,
    Notification,
    MultiChoiceQuestion,
    MultiChoiceAnswer,
    Outcome
};