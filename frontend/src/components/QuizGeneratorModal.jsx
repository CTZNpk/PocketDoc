import React, { useState } from "react";
import useQuiz from "@/hooks/useQuiz";
import quizStore from "@/store/quizStore";
import docsStore from "@/store/docsStore";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { X } from "lucide-react";

export default function QuizGeneratorModal({ onClose }) {
  const { docs } = docsStore();
  const { addQuiz } = quizStore();
  const { generateQuizFromDoc, downloadQuizFromId } = useQuiz();
  const navigate = useNavigate();

  const [selectedDocId, setSelectedDocId] = useState(docs[0]?.id || "");
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [answerFormats, setAnswerFormats] = useState(["mcq"]);
  const [questionType, setQuestionType] = useState("mixed");
  const [latestQuizId, setLatestQuizId] = useState(null);

  const handleQuizGeneration = async () => {
    const quizId = await generateQuizFromDoc({
      documentId: selectedDocId,
      startPage,
      endPage,
      answerFormats,
      questionType,
    });

    addQuiz(quizId);
    setLatestQuizId(quizId);
  };

  const navigateToQuiz = () => {
    navigate(`/quiz/${latestQuizId}`);
  };

  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-zinc-400 hover:text-white"
      >
        <X />
      </button>

      <h2 className="text-white text-xl font-semibold mb-4">Generate Quiz</h2>

      {docs.length === 0 ? (
        <p className="text-zinc-400 mb-4">You don't have any documents yet.</p>
      ) : (
        <div className="space-y-4">
          {/* Document selection */}
          <div>
            <label className="text-zinc-300 block mb-2">Select Document</label>
            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
              className="w-full px-3 py-2 text-zinc-200 bg-gray-900 border border-zinc-700 rounded"
            >
              {docs.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.title}
                </option>
              ))}
            </select>
          </div>

          {/* Quiz settings */}
          <div className="border border-zinc-800 rounded-lg px-4 py-4 space-y-4">
            <h2 className="text-white text-lg font-semibold">Quiz Settings</h2>
            <p className="text-zinc-400 text-sm">
              Customize how your quiz is generated
            </p>

            {/* Page range */}
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

            {/* Answer formats */}
            <div className="space-y-2">
              <label className="text-zinc-300 block">Answer Formats</label>
              <div className="grid grid-cols-2 gap-2">
                {["mcq", "short", "long", "true/false"].map((format) => (
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

            {/* Question type */}
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

          {/* Actions */}
          <Button
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
            onClick={handleQuizGeneration}
          >
            Generate Quiz
          </Button>

          {latestQuizId && (
            <div className="flex gap-2 mt-4">
              <Button
                className="bg-cyan-600 hover:bg-cyan-700 text-white w-full"
                onClick={navigateToQuiz}
              >
                Take the Quiz
              </Button>
              <Button
                variant="outline"
                className="border-cyan-600 text-cyan-600 hover:bg-cyan-950 w-full"
                onClick={() => downloadQuizFromId(latestQuizId)}
              >
                Download Quiz
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
