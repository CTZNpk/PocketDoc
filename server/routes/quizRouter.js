const express = require("express");
const auth = require("../middlewares/auth");
const quizController = require("../controllers/quizController");

const quizrouter = express.Router();

quizrouter.post("/generate", auth, quizController.generateAndStoreQuiz);
quizrouter.post("/submit-quiz", auth, quizController.userCompletesQuiz);
quizrouter.get("/quiz-history", auth, quizController.getUserQuizHistory);

module.exports = quizrouter;
