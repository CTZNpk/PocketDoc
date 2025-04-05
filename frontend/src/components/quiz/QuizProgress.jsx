import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function QuizProgress({
  currentQuestion,
  totalQuestions,
  progress,
}) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="text-gray-300">{Math.round(progress)}% Complete</span>
      </div>
      <Progress
        value={progress}
        className="h-2 bg-gray-700"
        indicatorClassName="bg-gradient-to-r from-cyan-600 to-cyan-400"
      />
    </div>
  );
}
