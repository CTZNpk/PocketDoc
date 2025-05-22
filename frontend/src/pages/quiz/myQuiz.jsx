import { useEffect, useState } from "react";
import { Plus, ClipboardList } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import AnimateBox from "@/components/AnimateBox";
import Title from "@/components/Title";
import QuizGeneratorModal from "@/components/QuizGeneratorModal";
import useQuiz from "@/hooks/useQuiz";
import { useNavigate } from "react-router";
import userStore from "@/store/userStore";

export default function MyQuizScreen() {
  const [quizzes, setQuizzes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getUserQuizzes } = useQuiz();

  useEffect(() => {
    const fetch = async () => {
      const response = await getUserQuizzes();
      if (response) setQuizzes(response);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <Navbar />
      <div className="text-white mt-10">
        <AnimateBox className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center mt-8 mb-12">
            <Title>My Quizzes</Title>

            <Button
              variant="default"
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white flex items-center gap-2"
              size="lg"
            >
              <Plus className="h-5 w-5" />
              Generate Quiz
            </Button>
          </div>

          {quizzes.length === 0 ? (
            <EmptyQuizzesState setIsModalOpen={setIsModalOpen} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {quizzes.map((quiz, index) => (
                <QuizCard key={quiz.quizId} quiz={quiz} index={index + 1} />
              ))}
            </div>
          )}

          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="w-full max-w-2xl mx-auto border border-gray-700 rounded-lg bg-gray-900 p-6 relative shadow-xl">
                <QuizGeneratorModal onClose={() => setIsModalOpen(false)} />
              </div>
            </div>
          )}
        </AnimateBox>
      </div>
    </div>
  );
}

function EmptyQuizzesState({ setIsModalOpen }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg border border-gray-700 bg-gray-800/50 mt-8">
      <div className="bg-cyan-900/20 p-4 rounded-full mb-4">
        <ClipboardList className="h-12 w-12 text-cyan-400" />
      </div>
      <h2 className="text-xl font-medium text-white mb-2">No quizzes yet</h2>
      <p className="text-gray-400 text-center mb-6">
        Generate a quiz from a document to get started
      </p>
      <Button
        variant="outline"
        onClick={() => setIsModalOpen(true)}
        className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
      >
        <Plus className="h-4 w-4 mr-2" />
        Generate Quiz
      </Button>
    </div>
  );
}

function QuizCard({ quiz, index }) {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const navigate = useNavigate();

  return (
    <Card
      className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-cyan-700/10 transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/quiz/${quiz.quizId}`)}
    >
      <div className="relative h-32 bg-gradient-to-br from-cyan-900 to-cyan-700 flex items-center justify-center">
        <div className="text-white font-bold text-3xl">Quiz {index}</div>
        <Badge className="absolute top-2 right-2 bg-cyan-600 text-white border-none">
          Ready
        </Badge>
      </div>

      <CardContent className="p-4">
        <h3 className="font-medium text-white text-lg line-clamp-2">
          {quiz.documentTitle}
        </h3>
        <p className="text-sm text-gray-300 mt-1">
          Pages {quiz.startPage}–{quiz.endPage}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          {quiz.totalQuestions} Questions · {quiz.numberOfSubmissions}{" "}
          Submissions
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0 border-t border-gray-700 text-sm text-gray-400 flex justify-between">
        <span>{date}</span>
        <span>Avg: {quiz.averageScore}%</span>
      </CardFooter>
    </Card>
  );
}
