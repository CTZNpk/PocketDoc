// SummariesTab.jsx
import React, { useEffect, useState } from "react";
import { FileText, Users, Files, Download } from "lucide-react";
import { getAllSummaries, getDashboardSummaries } from "@/api/adminService";

export default function SummariesTab() {
  const [summaryStats, setSummaryStats] = useState([]);
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const summaryRes = await getDashboardSummaries();

      setSummaryStats([
        {
          title: "Total Users",
          value: summaryRes.totalUsers,
          icon: <Users size={20} />,
        },
        {
          title: "Documents",
          value: summaryRes.totalDocuments,
          icon: <FileText size={20} />,
        },
        {
          title: "Quizzes",
          value: summaryRes.totalQuizzes,
          icon: <Files size={20} />,
        },
        {
          title: "Summaries",
          value: summaryRes.totalSummaries,
          icon: <FileText size={20} />,
        },
      ]);
    };

    fetchData();

    const fetchSummaries = async () => {
      try {
        const result = await getAllSummaries();
        setSummaries(result);
      } catch (error) {
        console.error("Failed to fetch summaries:", error);
      }
    };
    fetchSummaries();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryStats.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl shadow-cyan-900/10 p-6 flex items-start border border-gray-800"
          >
            <div className="rounded-full p-3 bg-cyan-900/20 text-cyan-400 mr-4">
              {item.icon}
            </div>
            <div>
              <h3 className="text-gray-400 text-sm font-medium">
                {item.title}
              </h3>
              <div className="flex items-baseline mt-1">
                <span className="text-2xl font-semibold text-white">
                  {item.value}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-white mb-4">All Summaries</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-800">
        <table className="min-w-full text-sm text-left text-gray-400">
          <thead className="bg-gray-900 text-xs uppercase text-gray-500 border-b border-gray-800">
            <tr>
              <th className="px-6 py-3">Document</th>
              <th className="px-6 py-3">Pages</th>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Format</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800/50 divide-y divide-gray-800">
            {summaries.map((summary) => (
              <tr key={summary._id} className="hover:bg-gray-800">
                <td className="px-6 py-4">
                  {summary.document?.title || summary.filePath}
                </td>
                <td className="px-6 py-4">
                  {summary.startPage} - {summary.endPage}
                </td>
                <td className="px-6 py-4">
                  {summary.userId?.name || "Unknown"}
                </td>
                <td className="px-6 py-4">{summary.metadata?.documentType}</td>
                <td className="px-6 py-4">
                  {summary.metadata?.formatPreference}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
