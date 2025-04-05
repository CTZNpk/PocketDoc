import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuizResults from "@/components/quiz/QuizResults";
import QuizIntro from "@/components/quiz/QuizIntro";
import QuizProgress from "@/components/quiz/QuizProgress";

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
