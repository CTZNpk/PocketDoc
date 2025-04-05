import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle2, BookOpen, FileCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function QuizIntro({ quizData, onStartQuiz }) {
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
