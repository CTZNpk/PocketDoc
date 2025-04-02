const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    documentId: String,
    filePath: { type: String, required: true },
    startPage: { type: Number, default: 1 },
    endPage: { type: Number, default: 1 },
    quiz: [
      {
        question: String,
        options: [String],
        correctAnswer: String,
        explanation: String,
        type: String,
      },
    ],
    metadata: {
      answerFormats: {
        type: [String],
        enum: ["multiple_choice", "true_false", "short", "long"],
        required: true,
      },
      questionType: {
        type: String,
        enum: ["mixed", "conceptual", "factual"],
        default: "mixed",
      },
      generatedAt: { type: Date, default: Date.now },
    },
    submissions: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        score: Number,
        responses: [{ questionId: Number, userAnswer: String }],
        submittedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Quiz", quizSchema);
