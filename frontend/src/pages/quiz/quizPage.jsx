import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router";
import useQuiz from "@/hooks/useQuiz";
import Background from "@/components/Background";
import QuestionRenderer from "@/components/quiz/QuizRenderer";

export default function QuizModule() {
  const { quizId } = useParams();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { getQuiz } = useQuiz();
  const [quizData, setQuizData] = useState();
  let progressPercentage;

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

  useEffect(() => {
    const fetch = async () => {
      const response = await getQuiz(quizId);
      console.log(response);
      setQuizData(response);
      console.log(response);
    };
    console.log(quizStarted);
    fetch();
  }, []);

  if (quizData)
    progressPercentage =
      ((currentQuestionIndex + 1) / quizData.totalQuestions) * 100;

  const handleAnswer = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: answer,
    });
  };

  if (quizCompleted) {
    return <QuizResults quizData={quizData} answers={answers} />;
  }

  if (!quizStarted) {
    if (!quizData)
      return (
        <Background>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        </Background>
      );
    return (
      <QuizIntro quizId={quizId} quizData={quizData} onStartQuiz={startQuiz} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <Navbar />
      <div className="container mx-auto py-16 px-4 min-h-screen flex items-center justify-center">
        <div className="max-w-3xl mx-auto">
          <QuizProgress
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={quizData.questions.length}
            progress={progressPercentage}
          />

          <Card
            className="mt-8 w-[500px] bg-gradient-to-br from-gray-800 to-gray-900 
    border border-gray-700 shadow-lg shadow-cyan-900/10 flex flex-col"
          >
            <CardHeader className="border-b border-gray-700">
              <CardTitle className="text-2xl text-white">
                Question {currentQuestionIndex + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="py-6">
              <QuestionRenderer
                question={quizData.questions[currentQuestionIndex]}
                answer={answers[currentQuestionIndex]}
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
