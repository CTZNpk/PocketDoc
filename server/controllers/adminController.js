const documentModel = require("../models/documentModel");
const quizModel = require("../models/quizModel");
const summaryModel = require("../models/summaryModel");
const textSummaryModel = require("../models/textSummaryModel");
const userModel = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  const users = await userModel.find();
  res.json(users);
};

exports.createUser = async (req, res) => {
  const user = new userModel(req.body);
  await user.save();
  res.status(201).json(user);
};

exports.deleteUser = async (req, res) => {
  await userModel.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

exports.getUserStats = async (req, res) => {
  const totalUsers = await userModel.countDocuments();
  res.json({ totalUsers });
};

exports.getAllDocuments = async (req, res) => {
  const documents = await documentModel.find();
  res.json(documents);
};

exports.uploadDocument = async (req, res) => {
  const doc = new documentModel(req.body);
  await doc.save();
  res.status(201).json(doc);
};

exports.deleteDocument = async (req, res) => {
  await documentModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Document deleted" });
};

exports.getAllQuizzes = async (req, res) => {
  const quizzes = await quizModel.find();
  res.json(quizzes);
};

exports.createQuiz = async (req, res) => {
  const quiz = new quizModel(req.body);
  await quiz.save();
  res.status(201).json(quiz);
};

exports.deleteQuiz = async (req, res) => {
  await quizModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Quiz deleted" });
};

exports.getQuizStats = async (req, res) => {
  const totalQuizzes = await quizModel.countDocuments();
  res.json({ totalQuizzes });
};

exports.getDashboardSummaries = async (req, res) => {
  const totalUsers = await userModel.countDocuments();
  const totalDocuments = await documentModel.countDocuments();
  const totalQuizzes = await quizModel.countDocuments();
  const totalSummaries = await summaryModel.countDocuments();

  res.json({
    totalUsers,
    totalDocuments,
    totalQuizzes,
    totalSummaries,
  });
};

exports.getAllSummaries = async (req, res) => {
  try {
    const summaries = await summaryModel
      .find()
      .populate("document", "title")
      .populate("userId", "name email");
    res.status(200).json(summaries);
  } catch (error) {
    console.error("Error fetching summaries:", error);
    res.status(500).json({ message: "Failed to fetch summaries" });
  }
};
