const userModel = require("../models/userModel");
const axios = require("axios");
const Quiz = require("../models/quizModel");
const querystring = require("querystring");
const documentModel = require("../models/documentModel");

const generateAndStoreQuiz = async (req, res) => {
  try {
    const requiredFields = ["answerFormats", "startPage", "endPage"];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: "error",
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const document = await documentModel.findById(req.body.documentId);
    if (!document) {
      return res.status(404).json({
        status: "error",
        error: `This Document Does not exist`,
      });
    }

    const payload = {
      file_path: document.file,
      start_page: req.body.startPage || 1,
      end_page: req.body.endPage || 1,
      answer_formats: req.body.answerFormats,
      question_type: req.body.questionType || "mixed",
      document_id: document._id,
    };

    const formData = querystring.stringify(payload);

    // Call FastAPI
    const fastApiResponse = await axios.post(
      "http://localhost:8000/generate-quiz/",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      },
    );

    if (!fastApiResponse.data?.quiz) {
      throw new Error("Invalid quiz response from FastAPI");
    }

    const quizDoc = new Quiz({
      userId: document.userId,
      documentId: req.body.documentId,
      filePath: document.file,
      startPage: req.body.startPage || 1,
      endPage: req.body.endPage || 1,
      quiz: fastApiResponse.data.quiz,
      metadata: {
        answerFormats: Array.isArray(req.body.answerFormats)
          ? req.body.answerFormats
          : [req.body.answer_formats],
        questionType: req.body.questionType || "mixed",
        generatedAt: new Date(),
      },
      submissions: [],
    });

    await quizDoc.save();

    return res.status(201).json({
      status: "success",
      data: {
        quizId: quizDoc._id,
        questionCount: fastApiResponse.data.quiz.length,
      },
    });
  } catch (error) {
    console.error("Quiz generation failed:", error);
    return res.status(500).json({
      status: "error",
      error: "Quiz generation failed",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const userCompletesQuiz = async (req, res) => {
  try {
    const { userId, quizId, responses } = req.body;

    // Validate quiz and user
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    // Calculate score
    let score = 0;
    responses.forEach(({ questionId, userAnswer }) => {
      if (quiz.quiz[questionId]?.correctAnswer === userAnswer) {
        score++;
      }
    });

    quiz.submissions.push({
      userId,
      score,
      responses,
      submittedAt: new Date(),
    });

    await quiz.save();

    return res.status(200).json({
      status: "success",
      message: "Quiz submitted successfully",
      data: {
        quizId,
        userId,
        score,
        totalQuestions: quiz.quiz.length,
      },
    });
  } catch (error) {
    console.error("Quiz submission failed:", error);
    return res.status(500).json({ error: "Quiz submission failed" });
  }
};

const getUserQuizHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find quizzes where the user has submissions
    const quizzes = await Quiz.find({ "submissions.userId": userId })
      .populate("submissions.userId", "name email")
      .exec();

    if (!quizzes.length) {
      return res
        .status(404)
        .json({ error: "No quiz history found for this user" });
    }

    // Format history response
    const history = quizzes.map((quiz) => ({
      quizId: quiz._id,
      documentId: quiz.documentId,
      filePath: quiz.filePath,
      submittedAt: quiz.submissions.find((s) => s.userId.toString() === userId)
        ?.submittedAt,
      score: quiz.submissions.find((s) => s.userId.toString() === userId)
        ?.score,
      totalQuestions: quiz.quiz.length,
    }));

    return res.status(200).json({ status: "success", data: history });
  } catch (error) {
    console.error("Error fetching quiz history:", error);
    return res.status(500).json({ error: "Error fetching quiz history" });
  }
};

// Export functions
module.exports = {
  generateAndStoreQuiz,
  userCompletesQuiz,
  getUserQuizHistory,
};
