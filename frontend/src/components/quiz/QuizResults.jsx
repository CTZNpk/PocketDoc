import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Timer, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router";

export default function QuizResults({ quizResults }) {
  const { evaluation, percentage_score, total_score } = quizResults;
  const navigate = useNavigate();
  const navigateToLanding = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white mt-10">
      <Navbar />
      <div className="container mx-auto py-16 px-4">
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
                <h2 className="text-4xl font-bold text-white">
                  {percentage_score}%
                </h2>
                <p className="text-gray-400 mt-2">
                  You scored {total_score} out of{" "}
                  {evaluation.reduce((sum, e) => sum + e.out_of, 0)} total
                  points
                </p>
              </div>

              <div className="space-y-8 mt-8">
                <h3 className="text-xl font-medium text-white border-b border-gray-700 pb-2">
                  Question Review
                </h3>

                {evaluation.map((q, index) => (
                  <div key={index} className="p-4 bg-gray-800/30 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-400">
                          Question {index + 1} ({q.question_type})
                        </p>
                        <p className="text-lg text-white mt-1">{q.question}</p>
                      </div>
                      <div
                        className={`flex items-center gap-2 ${q.score === q.out_of ? "text-green-400" : "text-red-400"}`}
                      >
                        {q.score === q.out_of ? (
                          <CheckCircle2 className="h-6 w-6" />
                        ) : (
                          <span className="h-6 w-6 rounded-full border-2 border-current flex items-center justify-center">
                            ✕
                          </span>
                        )}
                        <span className="text-sm font-semibold">
                          {q.score}/{q.out_of}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 p-3 rounded-md">
                        <p className="text-sm text-gray-400">Your Answer:</p>
                        <p className="text-gray-300">
                          {q.user_answer || "No answer provided"}
                        </p>
                      </div>
                      <div className="bg-gray-800/50 p-3 rounded-md">
                        <p className="text-sm text-gray-400">Correct Answer:</p>
                        <p className="text-gray-300">{q.correct_answer}</p>
                      </div>
                    </div>

                    {q.justification && (
                      <div className="bg-gray-800/50 p-3 rounded-md mt-2">
                        <p className="text-sm text-gray-400">Justification:</p>
                        <p className="text-gray-300">{q.justification}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div
                className="flex justify-center gap-4 pt-8 pb-4"
                onClick={navigateToLanding}
              >
                <Button className="px-6 py-2 bg-gray-700 hover:bg-gray-600">
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
