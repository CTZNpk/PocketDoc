import useQuiz from "@/hooks/useQuiz";
import quizStore from "@/store/quizStore";
import React, { useState } from "react";
import GenericTabLayout from "./GenericTabLayout";
import { Button } from "@/components/ui/button";

export default function QuizTab({ documentId }) {
  const { generateQuizFromDoc } = useQuiz();
  const [showSettings, setShowSettings] = useState(false);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [answerFormats, setAnswerFormats] = useState(["mcq"]);
  const [questionType, setQuestionType] = useState("mixed");
  const { addQuiz } = quizStore();
  const [latestQuizId, setLatestQuizId] = useState(null);

  const handleQuizGeneration = async () => {
    const quizId = await generateQuizFromDoc({
      documentId,
      startPage,
      endPage,
      answerFormats,
      questionType,
    });

    addQuiz(quizId);
    console.log(quizId);
    setLatestQuizId(quizId);
  };

  return (
    <GenericTabLayout
      value="quiz"
      title="Quiz Generation"
      generateFunction={handleQuizGeneration}
      settingsComponent={
        <div>
          <div className="border border-zinc-800 rounded-lg px-4 py-4 space-y-4 mb-4">
            <h2 className="text-white text-lg font-semibold">Quiz Settings</h2>
            <p className="text-zinc-400 text-sm">
              Customize how your quiz is generated
            </p>

            {/* Start & End Page */}
            <div className="flex space-x-4">
              <div className="flex-1 space-y-1">
                <label className="text-zinc-300 block">Start Page</label>
                <input
                  type="number"
                  value={startPage}
                  onChange={(e) => setStartPage(Number(e.target.value))}
                  min={1}
                  className="w-full border border-zinc-700 text-white px-3 py-2 rounded"
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-zinc-300 block">End Page</label>
                <input
                  type="number"
                  value={endPage}
                  onChange={(e) => setEndPage(Number(e.target.value))}
                  min={startPage}
                  className="w-full border border-zinc-700 text-white px-3 py-2 rounded"
                />
              </div>
            </div>

            {/* Answer Formats (Multiple select) */}
            <div className="space-y-2">
              <label className="text-zinc-300 block">Answer Formats</label>
              <div className="grid grid-cols-2 gap-2">
                {["mcq", "short", "long", "true_false"].map((format) => (
                  <label
                    key={format}
                    className="flex items-center space-x-2 text-zinc-200"
                  >
                    <input
                      type="checkbox"
                      checked={answerFormats.includes(format)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAnswerFormats([...answerFormats, format]);
                        } else {
                          setAnswerFormats(
                            answerFormats.filter((f) => f !== format),
                          );
                        }
                      }}
                      className="accent-cyan-600"
                    />
                    <span className="capitalize">{format}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Question Type (Single select) */}
            <div className="space-y-2">
              <label className="text-zinc-300 block">Question Type</label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="w-full border border-zinc-700 text-white px-3 py-2 rounded"
              >
                <option value="mixed">Mixed</option>
                <option value="conceptual">Conceptual</option>
                <option value="factual">Factual</option>
              </select>
            </div>
          </div>
          {latestQuizId && (
            <div className="flex gap-2 mt-4">
              <Button
                className="bg-cyan-600 hover:bg-cyan-700 text-white w-full"
                onClick={() => {}}
              >
                Take the Quiz
              </Button>
              <Button
                variant="outline"
                className="border-cyan-600 text-cyan-600 hover:bg-cyan-950 w-full"
                onClick={() => {}}
              >
                Download Quiz
              </Button>
            </div>
          )}
        </div>
      }
      selectedText={"."}
      text={""}
    />
  );
}
