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

//TODO: What about topic based quiz How will we handle that? Maybe by making documentID In quiz Schema nullable ? 
// and maybe also make another field genre of the quiz. If the doc is not given we would know of topic to make the quiz of

const quizSchema = new mongoose.Schema({
  //TODO Add UserID in quiz Schema


  //TODO Change to document ID 
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
