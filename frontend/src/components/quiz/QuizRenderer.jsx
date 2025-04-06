import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function QuestionRenderer({ question, answer, onAnswer }) {
  switch (question.type) {
    case "mcq":
      return (
        <MCQQuestion question={question} answer={answer} onAnswer={onAnswer} />
      );
    case "true/false":
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

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 bg-gray-800/50 rounded-lg p-4 hover:bg-gray-700/50 transition-colors ${answer === index ? "ring-2 ring-cyan-400" : ""
              }`}
            onClick={() => onAnswer(index)}
          >
            <div className="flex items-center justify-center">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${answer === index ? "border-cyan-400" : "border-gray-400"
                  }`}
              >
                {answer === index && (
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                )}
              </div>
            </div>

            <label className="w-full cursor-pointer text-gray-200">
              {option}
            </label>
          </div>
        ))}
      </div>
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
