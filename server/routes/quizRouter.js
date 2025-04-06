const express = require("express");
const auth = require("../middlewares/auth");
const quizController = require("../controllers/quizController");

const quizrouter = express.Router();

quizrouter.post("/generate", auth, quizController.generateAndStoreQuiz);
quizrouter.get("/all", auth, quizController.getUserQuiz);
quizrouter.get("/:quizId", auth, quizController.getQuizById);
quizrouter.get("/:quizId/download", auth, quizController.downloadQuizAndKey);
quizrouter.post("/submit", auth, quizController.submitQuiz);

module.exports = quizrouter;
