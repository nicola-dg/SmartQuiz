export class QuizAdapter {
    static adaptToBackend(quiz) {
        const { title, description, numMaxError, link, question, ans1, ans2, ans3, ans4, correctAnswer, userId } = quiz;
        const choices = JSON.stringify([ans1, ans2, ans3, ans4]);
        return {
            title: title,
            description: description,
            numMaxError: numMaxError,
            link: link,
            question: question,
            choices: choices,
            correctAnswer: correctAnswer,
            UserId: userId
        };
    }
    static adaptToFrontend(quiz) {
        const { id, title, description, numMaxError, link, question, choices, correctAnswer, UserId } = quiz;
        const [ans1, ans2, ans3, ans4] = JSON.parse(choices);
        return {
            id: id,
            title: title,
            description: description,
            numMaxError: numMaxError,
            link: link,
            question: question,
            ans1: ans1,
            ans2: ans2,
            ans3: ans3,
            ans4: ans4,
            correctAnswer: correctAnswer,
            userId: UserId
        };
    }
}
