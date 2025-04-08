// QuizzesTab.jsx
import React, { useEffect, useState } from "react";
import { Filter, Plus, Eye, Trash2, Files } from "lucide-react";
import { getAllQuizzes, deleteQuiz } from "@/api/adminService";
export default function QuizzesTab() {
  const [quizzes, setQuizzes] = useState([]);

  const fetchQuizzes = async () => {
    try {
      const result = await getAllQuizzes();
      setQuizzes(result);
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteQuiz(id);
      setQuizzes((prev) => prev.filter((quiz) => quiz._id !== id));
    } catch (error) {
      console.error("Failed to delete quiz:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl shadow-cyan-900/10 overflow-hidden border border-gray-800">
      <div className="flex justify-between items-center p-6 border-b border-gray-800">
        <h3 className="text-lg font-medium text-white">Quizzes</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-900">
            <tr>
              {["Title", "Document", "Questions", "Attempts", "Actions"].map(
                (heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className={`px-6 py-3 ${heading === "Actions" ? "text-right" : "text-left"} text-xs font-medium text-gray-400 uppercase tracking-wider`}
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="bg-gray-800/50 divide-y divide-gray-800">
            {quizzes.map((quiz) => (
              <tr key={quiz._id} className="hover:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="rounded p-2 bg-purple-900/20 text-purple-400 mr-3">
                      <Files size={16} />
                    </div>
                    <div className="text-sm font-medium text-gray-200">
                      {quiz.title}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {quiz.documentId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {quiz.quiz.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {quiz.submissions.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => handleDelete(quiz._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
