import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  BookOpen,
  FileCheck,
  Timer,
  Trophy,
  PenLine,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Dummy quiz data
const quizData = {
  quizId: "q12345",
  documentName: "Advanced Machine Learning Concepts",
  startPage: 24,
  endPage: 42,
  answerFormat: ["mcq", "true_false", "short", "long"],
  questionType: "mixed",
  generatedAt: "2025-04-02T12:30:00Z",
  submissions: 127,
  averageScore: 72,
  totalQuestions: 8,
  questions: [
    {
      id: 1,
      type: "mcq",
      question:
        "Which of the following is NOT a common activation function in neural networks?",
      options: [
        "ReLU (Rectified Linear Unit)",
        "Sigmoid",
        "Quadratic Activation Function",
        "Tanh (Hyperbolic Tangent)",
      ],
      correctAnswer: 2, // Index of correct option
    },
    {
      id: 2,
      type: "true_false",
      question:
        "Gradient descent is a first-order optimization algorithm for finding the minimum of a function.",
      correctAnswer: true,
    },
    {
      id: 3,
      type: "short",
      question: "What does the acronym CNN stand for in deep learning?",
      correctAnswer: "Convolutional Neural Network",
    },
    {
      id: 4,
      type: "long",
      question:
        "Explain the concept of overfitting in machine learning and mention at least two techniques to prevent it.",
      correctAnswer:
        "Overfitting occurs when a model learns the training data too well, including its noise and outliers, resulting in poor generalization to new data. Techniques to prevent overfitting include regularization (L1, L2), dropout, early stopping, data augmentation, and cross-validation.",
    },
    {
      id: 5,
      type: "mcq",
      question: "Which of these is a type of unsupervised learning algorithm?",
      options: [
        "Linear Regression",
        "Random Forest",
        "K-means Clustering",
        "Support Vector Machines",
      ],
      correctAnswer: 2,
    },
    {
      id: 6,
      type: "true_false",
      question:
        "Transfer learning involves using a pre-trained model for a new but related task.",
      correctAnswer: true,
    },
    {
      id: 7,
      type: "short",
      question:
        "What is the purpose of the activation function in neural networks?",
      correctAnswer:
        "To introduce non-linearity into the network, allowing it to learn complex patterns",
    },
    {
      id: 8,
      type: "mcq",
      question:
        "Which loss function is commonly used for binary classification problems?",
      options: [
        "Mean Squared Error",
        "Binary Cross-Entropy",
        "Hinge Loss",
        "Categorical Cross-Entropy",
      ],
      correctAnswer: 1,
    },
  ],
};

export default function QuizModule() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswer = (answer) => {
    setAnswers({
      ...answers,
      [quizData.questions[currentQuestionIndex].id]: answer,
    });
  };

  const progressPercentage =
    ((currentQuestionIndex + 1) / quizData.totalQuestions) * 100;

  if (quizCompleted) {
    return <QuizResults quizData={quizData} answers={answers} />;
  }

  if (!quizStarted) {
    return <QuizIntro quizData={quizData} onStartQuiz={startQuiz} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <Navbar />
      <div className="container mx-auto py-16 px-4 min-h-screen flex items-center justify-center">
        <div className="max-w-3xl mx-auto">
          <QuizProgress
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={quizData.totalQuestions}
            progress={progressPercentage}
          />

          <Card className="mt-8 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-lg shadow-cyan-900/10">
            <CardHeader className="border-b border-gray-700">
              <CardTitle className="text-2xl text-white">
                Question {currentQuestionIndex + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="py-6">
              <QuestionRenderer
                question={quizData.questions[currentQuestionIndex]}
                answer={answers[quizData.questions[currentQuestionIndex].id]}
                onAnswer={handleAnswer}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button
                onClick={handleNextQuestion}
                className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400"
              >
                {currentQuestionIndex === quizData.questions.length - 1
                  ? "Finish"
                  : "Next"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function QuizIntro({ quizData, onStartQuiz }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <Navbar />
      <div className="container mx-auto py-16 px-4 min-h-screen flex items-center justify-center">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-lg shadow-cyan-900/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-transparent pointer-events-none"></div>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-white">
                Quiz Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex flex-col items-center p-4 bg-gray-800/50 rounded-lg">
                  <BookOpen className="h-8 w-8 text-cyan-400 mb-2" />
                  <h3 className="font-medium text-gray-300">Document</h3>
                  <p className="text-lg font-semibold text-white">
                    {quizData.documentName}
                  </p>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-800/50 rounded-lg">
                  <FileCheck className="h-8 w-8 text-cyan-400 mb-2" />
                  <h3 className="font-medium text-gray-300">Pages</h3>
                  <p className="text-lg font-semibold text-white">
                    {quizData.startPage} - {quizData.endPage}
                  </p>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-800/50 rounded-lg">
                  <CheckCircle2 className="h-8 w-8 text-cyan-400 mb-2" />
                  <h3 className="font-medium text-gray-300">Questions</h3>
                  <p className="text-lg font-semibold text-white">
                    {quizData.totalQuestions}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-medium text-white">Quiz Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <p className="text-gray-400">Question Type</p>
                    <p className="text-lg font-medium text-white capitalize">
                      {quizData.questionType}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <p className="text-gray-400">Answer Format</p>
                    <p className="text-lg font-medium text-white capitalize">
                      {quizData.answerFormat.join(", ")}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <p className="text-gray-400">Submissions</p>
                    <p className="text-lg font-medium text-white">
                      {quizData.submissions}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <p className="text-gray-400">Average Score</p>
                    <p className="text-lg font-medium text-white">
                      {quizData.averageScore}%
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pt-2 pb-6">
              <Button
                onClick={onStartQuiz}
                className="px-8 py-6 rounded-lg text-lg bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400"
              >
                Start Quiz <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function QuizProgress({ currentQuestion, totalQuestions, progress }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="text-gray-300">{Math.round(progress)}% Complete</span>
      </div>
      <Progress
        value={progress}
        className="h-2 bg-gray-700"
        indicatorClassName="bg-gradient-to-r from-cyan-600 to-cyan-400"
      />
    </div>
  );
}

function QuestionRenderer({ question, answer, onAnswer }) {
  switch (question.type) {
    case "mcq":
      return (
        <MCQQuestion question={question} answer={answer} onAnswer={onAnswer} />
      );
    case "true_false":
      return (
        <TrueFalseQuestion
          question={question}
          answer={answer}
          onAnswer={onAnswer}
        />
      );
    case "short":
      return (
        <ShortAnswerQuestion
          question={question}
          answer={answer}
          onAnswer={onAnswer}
        />
      );
    case "long":
      return (
        <LongAnswerQuestion
          question={question}
          answer={answer}
          onAnswer={onAnswer}
        />
      );
    default:
      return <p>Unsupported question type</p>;
  }
}

function MCQQuestion({ question, answer, onAnswer }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-white">{question.question}</h3>
      <RadioGroup value={answer} onValueChange={onAnswer} className="space-y-4">
        {question.options.map((option, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 bg-gray-800/50 rounded-lg p-4 hover:bg-gray-700/50 transition-colors"
          >
            <RadioGroupItem
              id={`option-${index}`}
              value={index}
              className="text-cyan-400"
            />
            <Label
              htmlFor={`option-${index}`}
              className="w-full cursor-pointer text-gray-200"
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

function TrueFalseQuestion({ question, answer, onAnswer }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-white">{question.question}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className={`p-6 rounded-lg text-center cursor-pointer border-2 transition-all ${answer === true ? "border-cyan-500 bg-cyan-900/20" : "border-gray-700 bg-gray-800/50 hover:bg-gray-700/50"}`}
          onClick={() => onAnswer(true)}
        >
          <p className="text-xl font-medium text-white">True</p>
        </div>
        <div
          className={`p-6 rounded-lg text-center cursor-pointer border-2 transition-all ${answer === false ? "border-cyan-500 bg-cyan-900/20" : "border-gray-700 bg-gray-800/50 hover:bg-gray-700/50"}`}
          onClick={() => onAnswer(false)}
        >
          <p className="text-xl font-medium text-white">False</p>
        </div>
      </div>
    </div>
  );
}

function ShortAnswerQuestion({ question, answer, onAnswer }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-white">{question.question}</h3>
      <div>
        <Input
          placeholder="Type your answer here..."
          value={answer || ""}
          onChange={(e) => onAnswer(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500"
        />
      </div>
    </div>
  );
}

function LongAnswerQuestion({ question, answer, onAnswer }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-white">{question.question}</h3>
      <div>
        <Textarea
          placeholder="Type your detailed answer here..."
          value={answer || ""}
          onChange={(e) => onAnswer(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white h-32 focus:border-cyan-500 focus:ring-cyan-500"
        />
      </div>
    </div>
  );
}

function QuizResults({ quizData, answers }) {
  // Calculate score (for MCQ and True/False questions only)
  const scorableQuestions = quizData.questions.filter(
    (q) => q.type === "mcq" || q.type === "true_false",
  );
  const correctAnswers = scorableQuestions.filter(
    (q) => answers[q.id] === q.correctAnswer,
  ).length;
  const score =
    scorableQuestions.length > 0
      ? Math.round((correctAnswers / scorableQuestions.length) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white mt-10">
      <Navbar />
      <div className="container mx-auto py-16 px-4">
        {/* Removed the Card wrapper and applied styles directly to the content */}
        <div className="max-w-full mx-auto">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-lg shadow-cyan-900/10 p-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-transparent pointer-events-none"></div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">Quiz Results</h1>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-400 flex items-center justify-center mb-4">
                  <Trophy className="h-16 w-16 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-white">{score}%</h2>
                <p className="text-gray-400 mt-2">
                  You answered {correctAnswers} out of{" "}
                  {scorableQuestions.length} scorable questions correctly
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <Timer className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
                  <h3 className="font-medium text-gray-300">Time Taken</h3>
                  <p className="text-lg font-semibold text-white">12:45</p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
                  <h3 className="font-medium text-gray-300">Questions</h3>
                  <p className="text-lg font-semibold text-white">
                    {quizData.totalQuestions}
                  </p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <PenLine className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
                  <h3 className="font-medium text-gray-300">Document</h3>
                  <p className="text-lg font-semibold text-white">
                    {quizData.documentName}
                  </p>
                </div>
              </div>

              <div className="space-y-8 mt-8">
                <h3 className="text-xl font-medium text-white border-b border-gray-700 pb-2">
                  Question Review
                </h3>

                {quizData.questions.map((question, index) => (
                  <div key={index} className="p-4 bg-gray-800/30 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-400">
                          Question {index + 1} ({question.type})
                        </p>
                        <p className="text-lg text-white mt-1">
                          {question.question}
                        </p>
                      </div>
                      {(question.type === "mcq" ||
                        question.type === "true_false") && (
                        <div
                          className={`flex items-center ${answers[question.id] === question.correctAnswer ? "text-green-400" : "text-red-400"}`}
                        >
                          {answers[question.id] === question.correctAnswer ? (
                            <CheckCircle2 className="h-6 w-6" />
                          ) : (
                            <span className="h-6 w-6 rounded-full border-2 border-current flex items-center justify-center">
                              ✕
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {question.type === "mcq" && (
                      <div className="mt-3 space-y-2">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`p-2 rounded-md ${
                              optIndex === question.correctAnswer
                                ? "bg-green-900/20 border border-green-600/30"
                                : optIndex === answers[question.id] &&
                                    optIndex !== question.correctAnswer
                                  ? "bg-red-900/20 border border-red-600/30"
                                  : "bg-gray-800/50"
                            }`}
                          >
                            <p className="text-sm text-gray-300">{option}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {question.type === "true_false" && (
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div
                          className={`p-2 rounded-md text-center ${
                            question.correctAnswer === true
                              ? "bg-green-900/20 border border-green-600/30"
                              : answers[question.id] === true
                                ? "bg-red-900/20 border border-red-600/30"
                                : "bg-gray-800/50"
                          }`}
                        >
                          <p className="text-sm text-gray-300">True</p>
                        </div>
                        <div
                          className={`p-2 rounded-md text-center ${
                            question.correctAnswer === false
                              ? "bg-green-900/20 border border-green-600/30"
                              : answers[question.id] === false
                                ? "bg-red-900/20 border border-red-600/30"
                                : "bg-gray-800/50"
                          }`}
                        >
                          <p className="text-sm text-gray-300">False</p>
                        </div>
                      </div>
                    )}

                    {question.type === "short" && (
                      <div className="mt-3">
                        <div className="bg-gray-800/50 p-3 rounded-md">
                          <p className="text-sm text-gray-400">Your Answer:</p>
                          <p className="text-gray-300">
                            {answers[question.id] || "No answer provided"}
                          </p>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-md mt-2">
                          <p className="text-sm text-gray-400">
                            Sample Answer:
                          </p>
                          <p className="text-gray-300">
                            {question.correctAnswer}
                          </p>
                        </div>
                      </div>
                    )}

                    {question.type === "long" && (
                      <div className="mt-3">
                        <div className="bg-gray-800/50 p-3 rounded-md">
                          <p className="text-sm text-gray-400">Your Answer:</p>
                          <p className="text-gray-300">
                            {answers[question.id] || "No answer provided"}
                          </p>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-md mt-2">
                          <p className="text-sm text-gray-400">
                            Sample Answer:
                          </p>
                          <p className="text-gray-300">
                            {question.correctAnswer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-8 pb-4">
              <Button className="px-6 py-2 bg-gray-700 hover:bg-gray-600">
                Back to Dashboard
              </Button>
              <Button className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400">
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
