import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function QuestionRenderer({ question, answer, onAnswer }) {
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
