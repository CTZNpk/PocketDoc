import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import SummaryTab from "./SummaryTab";
import UsersTab from "./UsersTab";
import DocumentsTab from "./DocumentTab";
import QuizzesTab from "./QuizzesTab";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("summaries");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);

  return (
    <div className="flex h-screen bg-gray-950">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-900">
        <TopHeader
          activeTab={activeTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Tab Views */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-900">
          {activeTab === "summaries" && <SummaryTab />}
          {activeTab === "users" && <UsersTab />}
          {activeTab === "documents" && (
            <DocumentsTab setShowDocumentUpload={setShowDocumentUpload} />
          )}
          {activeTab === "quizzes" && <QuizzesTab />}
        </main>
      </div>
    </div>
  );
}
