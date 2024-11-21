const quizModel = require("../models/quizModel");
const summaryModel = require("../models/summaryModel");
const userModel = require("../models/userModel");

//based on summary and telling number of questions we want it generate quizes
exports.generateQuiz = async (req, res) => {
  const { summaryId, numQuestions, difficulty } = req.body;
  try {
    if (!summaryId || !difficulty || !numQuestions) {
      res
        .status(404)
        .json({ error: "summaryId,numQuestions,difficulty are required" });
    }

    const summary = await summaryModel.findById(summaryId);
    if (!summary) {
      res.status(404).json({ error: "Summary Not Found. Cant Generate Quiz" });
    }
    const genQuestion = generateQuizQuestions(summary.content, 4, difficulty);
    if (genQuestion) {
      const quiz = new quizModel({
        summaryId: summaryId,

        questions: genQuestion,
        difficulty: difficulty,
        createdAt: new Date(),
      });
      await quiz.save();
      res.status(200).json({ message: "Quiz Successfully Made", quiz });
    }
  } catch (error) {
    res.status(500).json({ error: `Error in Generating Quiz: ${error}` });
  }
};
//when user completes quiz its history is saved for later use
exports.userCompletesQuiz = async (req, res) => {
  const { userId, quizId, score } = req.body;
  try {
    const user = await userModel.findById(userId);
    if (user) {
      const quiz = await quizModel.findById(quizId);
      if (!quiz) {
        res.status(404).json({ error: "USER HAVE NOT GIVEN ANY QUIZES YET" });
      }
      user.quizHistory.push({
        quizId: quizId,
        score: score,
        takenAt: new Date(),
      });
      await user.save();
      res
        .status(200)
        .json({ message: "Quiz History Updated Successfully", user });
    }
  } catch (error) {
    res
      .status(200)
      .json({ error: `Error Updating user quiz history: ${error.message}` });
  }
};
exports.getUserQuizHistory = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await userModel
      .findById(userId)
      .populate("quizHistory.quizId");
    if (!user) {
      res.status(404).json({ error: "USER NOT FOUND" });
    }
    const quizHistory = await user.quizHistory;
    res.status(200).json({ data: quizHistory });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error Getting user Quiz History: ${error.message}` });
  }
};

// Example function to generate quiz questions (replace with your own logic)
function generateQuizQuestions(content, numQuestions, difficulty) {
  // Simple placeholder logic for generating questions based on content
  // In practice, you would use NLP techniques or a quiz generation library
  const questions = [];
  for (let i = 1; i <= numQuestions; i++) {
    questions.push({
      question: `Sample question ${i} based on summary content`,
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: "Option 1",
    });
  }
  return questions;
}
