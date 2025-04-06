import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Timer, Trophy, PenLine } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function QuizResults({ quizData, answers }) {
  const scorableQuestions = quizData.questions.filter(
    (q) => q.type === "mcq" || q.type === "true/false",
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
                        question.type === "true/false") && (
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
                            className={`p-2 rounded-md ${optIndex === question.correctAnswer
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

                    {question.type === "true/false" && (
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div
                          className={`p-2 rounded-md text-center ${question.correctAnswer === true
                              ? "bg-green-900/20 border border-green-600/30"
                              : answers[question.id] === true
                                ? "bg-red-900/20 border border-red-600/30"
                                : "bg-gray-800/50"
                            }`}
                        >
                          <p className="text-sm text-gray-300">True</p>
                        </div>
                        <div
                          className={`p-2 rounded-md text-center ${question.correctAnswer === false
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
                            {answers[index] || "No answer provided"}
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
