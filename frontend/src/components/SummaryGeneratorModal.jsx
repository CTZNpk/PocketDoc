import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Settings } from "lucide-react";
import useSummary from "@/hooks/useSummary";
import { useNavigate } from "react-router";
import docsStore from "@/store/docsStore";

export default function SummaryGeneratorModal({ onClose }) {
  const { docs } = docsStore();
  const [selectedDocId, setSelectedDocId] = useState(docs[0]?.id || "");
  const [summaryText, setSummaryText] = useState("");
  const [summaryId, setSummaryId] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [documentType, setDocumentType] = useState("general");
  const [summaryLength, setSummaryLength] = useState(50);
  const [formatPreference, setFormatPreference] = useState("outline");
  const [focus, setFocus] = useState("main ideas");
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [totalPages, setTotalPages] = useState(100); // static for now
  const [isLoading, setIsLoading] = useState(false);

  const { generateSummaryPages } = useSummary();
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (startPage > endPage || startPage < 1 || endPage > totalPages) {
      setSummaryText("**Please enter a valid page range.**");
      return;
    }
    const response = await generateSummaryPages({
      startPage,
      endPage,
      focus,
      summaryLength,
      formatPreference,
      documentType,
      documentId: selectedDocId,
    });

    const cleanedMarkdown = response.summary
      .replace(/^```(?:\w+)?\n/, "")
      .replace(/```$/, "");

    setSummaryText(cleanedMarkdown);
    setSummaryId(response.summaryId);
  };

  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-zinc-400 hover:text-white"
      >
        <X />
      </button>

      <h2 className="text-white text-xl font-semibold mb-4">
        Generate Summary
      </h2>

      {docs.length === 0 ? (
        <p className="text-zinc-400 mb-4">You don't have any documents yet.</p>
      ) : (
        <div className="space-y-4">
          {/* Document Dropdown */}
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

          {/* Settings Toggle */}
          <Button
            variant="outline"
            className="w-full text-zinc-300 border-zinc-700"
            onClick={() => setShowSettings((prev) => !prev)}
          >
            <Settings className="mr-2 h-4 w-4" /> Summary Settings
          </Button>

          {/* Settings Panel */}
          {showSettings && (
            <div className="border border-zinc-800 rounded-lg px-4 py-4 space-y-4">
              {/* Document Type */}
              <div>
                <label className="text-zinc-300 block mb-1">
                  Document Type
                </label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full px-3 py-2 text-zinc-200 bg-gray-900 border border-zinc-700 rounded"
                >
                  <option value="general">General</option>
                  <option value="technical">Technical</option>
                </select>
              </div>

              {/* Summary Length */}
              <div>
                <label className="text-zinc-300 block mb-1">
                  Summary Length: {summaryLength}%
                </label>
                <input
                  type="range"
                  min={20}
                  max={80}
                  value={summaryLength}
                  onChange={(e) => setSummaryLength(parseInt(e.target.value))}
                  className="w-full accent-cyan-600"
                />
              </div>

              {/* Format Preference */}
              <div>
                <label className="text-zinc-300 block mb-1">Format</label>
                <select
                  value={formatPreference}
                  onChange={(e) => setFormatPreference(e.target.value)}
                  className="w-full px-3 py-2 text-zinc-200 bg-gray-900 border border-zinc-700 rounded"
                >
                  <option value="outline">Outline</option>
                  <option value="bullet">Bullet</option>
                  <option value="paragraph">Paragraph</option>
                </select>
              </div>

              {/* Focus */}
              <div>
                <label className="text-zinc-300 block mb-1">Focus</label>
                <select
                  value={focus}
                  onChange={(e) => setFocus(e.target.value)}
                  className="w-full px-3 py-2 text-zinc-200 bg-gray-900 border border-zinc-700 rounded"
                >
                  <option value="main ideas">Main Ideas</option>
                  <option value="definitions">Definitions</option>
                  <option value="concepts">Concepts</option>
                </select>
              </div>

              {/* Page Range */}
              <div className="flex space-x-2">
                <Input
                  type="number"
                  value={startPage}
                  onChange={(e) => setStartPage(Number(e.target.value))}
                  placeholder="Start Page"
                  className="w-1/2 border-zinc-700 text-white"
                />
                <Input
                  type="number"
                  value={endPage}
                  onChange={(e) => setEndPage(Number(e.target.value))}
                  placeholder="End Page"
                  className="w-1/2 border-zinc-700 text-white"
                />
              </div>
            </div>
          )}

          {/* Generate Summary Button */}
          <Button
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white"
            onClick={handleGenerate}
          >
            Generate Summary
          </Button>

          {/* Show result if available */}
          {summaryText && (
            <div className="mt-4 border border-zinc-700 rounded-lg p-4 text-sm text-zinc-300 whitespace-pre-wrap bg-zinc-900 max-h-64 overflow-y-auto">
              {summaryText}
              <Button
                onClick={() => navigate(`/summary/${summaryId}`)}
                className="mt-4"
                variant="outline"
              >
                View Full Summary
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
