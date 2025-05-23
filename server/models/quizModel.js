const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DocumentModel",
      required: true,
    },
    filePath: { type: String, required: true },
    startPage: { type: Number, default: 1 },
    endPage: { type: Number, default: 1 },

    quiz: [
      {
        type: {
          type: String,
          enum: ["mcq", "short", "long", "true/false"],
          required: true,
        },
        question: { type: String, required: true },
        options: [String], // Only for MCQ
        answer: { type: String, required: true },
      },
    ],

    metadata: {
      answerFormats: {
        type: [String],
        enum: ["mcq", "true/false", "short", "long"],
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
        responses: [
          {
            questionIndex: Number,
            userAnswer: String,
            evaluationScore: Number,
          },
        ],
        submittedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Quiz", quizSchema);
