const express = require("express");
const adminRouter = express.Router();
const {
  getAllUsers,
  createUser,
  deleteUser,
  getUserStats,
  getAllDocuments,
  uploadDocument,
  deleteDocument,
  getAllQuizzes,
  createQuiz,
  deleteQuiz,
  getQuizStats,
  getDashboardSummaries,
  getAllSummaries,
} = require("../controllers/adminController");

// Dashboard Summary
adminRouter.get("/dashboard", getDashboardSummaries);


// Users
adminRouter.get("/users", getAllUsers);
adminRouter.post("/users", createUser);
adminRouter.delete("/users/:id", deleteUser);
adminRouter.get("/users/stats", getUserStats);

// Documents
adminRouter.get("/documents", getAllDocuments);
adminRouter.post("/documents", uploadDocument);
adminRouter.delete("/documents/:id", deleteDocument);

// Quizzes
adminRouter.get("/quizzes", getAllQuizzes);
adminRouter.post("/quizzes", createQuiz);
adminRouter.delete("/quizzes/:id", deleteQuiz);
adminRouter.get("/quizzes/stats", getQuizStats);

adminRouter.get("/summaries", getAllSummaries);

module.exports = adminRouter;
