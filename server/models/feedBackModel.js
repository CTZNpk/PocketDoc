const mongoose = require("mongoose");
const feebackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "UserModel",
  },
  summaryId: {
    type: mongoose.Schema.ObjectId,
    ref: "SummaryModel",
    allowNull:true
  },
  quizId: {
    type: mongoose.Schema.ObjectId,
    ref: "QuizModel",
    allowNull:true
  },
  feedbackType: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 0,
  },
  submittedAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("FeedbackModel", feebackSchema);
