import React from "react";
import { BarChart, Users, FileText, Files, Book, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import useAuth from "@/hooks/useAuth";

export default function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-950 border-r border-gray-800 text-white flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold flex items-center text-white">
          <img src="/logo.png" alt="PocketDoc Logo" className="h-12 mr-5" />
          PocketDoc Admin
        </h1>
      </div>
      <nav className="flex-1 px-4 pb-4">
        <div className="space-y-1">
          {[
            { key: "summaries", label: "Summaries", icon: BarChart },
            { key: "users", label: "Users", icon: Users },
            { key: "documents", label: "Documents", icon: FileText },
            { key: "quizzes", label: "Quizzes", icon: Files },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center w-full px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors ${activeTab === item.key ? "bg-gray-800 border-l-2 border-cyan-500" : ""}`}
            >
              <item.icon
                className={`mr-3 ${activeTab === item.key ? "text-cyan-500" : "text-gray-400"}`}
                size={18}
              />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="pt-8 space-y-1">
          <button
            className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            onClick={() => {
              handleLogout();
              navigate("/");
            }}
          >
            <LogOut className="mr-3 text-gray-400" size={18} />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
