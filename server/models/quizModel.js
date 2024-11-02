const mongoose = require("mongoose");
const questionsSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

const quizSchema = new mongoose.Schema({
  summaryId: {
    type: mongoose.Schema.ObjectId,
    ref: "SummaryModel",
  },
  questions: {
    type: [questionsSchema],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("QuizModel", quizSchema);
