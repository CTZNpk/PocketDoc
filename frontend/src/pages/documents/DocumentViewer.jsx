import { useState, useEffect } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronRight,
  ChevronLeft,
  FileText,
  MessageSquare,
  Layers,
  X,
} from "lucide-react";
import PdfViewer from "@/components/PdfViewer";
import SummaryTab from "@/components/documentTabs/SummaryTab";
import ExplanationTab from "@/components/documentTabs/ExplanationTab";
import PageRangeSummary from "@/components/documentTabs/PageRangeSummary";
import { useParams } from "react-router";

export default function DocumentViewer() {
  const { docId } = useParams();
  const [isGeneratingExplanation, setIsGeneratingExplanation] = useState(false);
  const [isGeneratingPageSummary, setIsGeneratingPageSummary] = useState(false);

  const [selectedText, setSelectedText] = useState("");
  const [activeTab, setActiveTab] = useState("summary");
  const [showPanel, setShowPanel] = useState(true);

  const [explanationQuery, setExplanationQuery] = useState("");
  // Sidebar width state (in pixels)
  const [panelWidth, setPanelWidth] = useState(384);

  // Monitor selection changes
  useEffect(() => {
    const handleSelectionChange = () => {
      const selected = window.getSelection().toString().trim();
      if (selected) {
        setSelectedText(selected);
      }
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", handleSelectionChange);
  }, []);

  // Draggable handle event handlers for adjusting the sidebar width
  const handleDragStart = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleDragging);
    document.addEventListener("mouseup", handleDragEnd);
  };

  const handleDragging = (e) => {
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth >= 200 && newWidth <= 600) {
      setPanelWidth(newWidth);
    }
  };

  const handleDragEnd = () => {
    document.removeEventListener("mousemove", handleDragging);
    document.removeEventListener("mouseup", handleDragEnd);
  };

  // Generate page range summary handler

  return (
    <div className="flex h-screen bg-black overflow-hidden relative">
      {/* PDF Viewer Area */}
      <div className="flex-1 transition-all duration-300">
        <PdfViewer />
      </div>

      {/* Toggle Button (always visible) */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-l-lg shadow-lg z-30"
      >
        {showPanel ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Document Tools Sidebar */}
      {showPanel && (
        <div
          style={{ width: panelWidth }}
          className="relative bg-zinc-900 border-l border-zinc-800 shadow-xl transition-all duration-300"
        >
          {/* Draggable handle */}
          <div
            onMouseDown={handleDragStart}
            className="absolute left-0 top-0 h-full w-2 cursor-col-resize z-30"
          />
          <div className="flex flex-col h-full ml-2">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <h2 className="text-xl font-semibold text-white">
                Document Tools
              </h2>
              <button
                onClick={() => setShowPanel(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex-1 flex flex-col text-white"
            >
              <TabsList className="grid grid-cols-3 mx-4 mt-4">
                <TabsTrigger
                  value="summary"
                  className="flex items-center gap-2"
                >
                  <FileText size={16} />
                  <span className="hidden sm:inline">Summary</span>
                </TabsTrigger>
                <TabsTrigger
                  value="explain"
                  className="flex items-center gap-2"
                >
                  <MessageSquare size={16} />
                  <span className="hidden sm:inline">Explain</span>
                </TabsTrigger>
                <TabsTrigger
                  value="pageRange"
                  className="flex items-center gap-2"
                >
                  <Layers size={16} />
                  <span className="hidden sm:inline">Pages</span>
                </TabsTrigger>
              </TabsList>

              {/* Summary Tab */}
              <SummaryTab selectedText={selectedText} />

              {/* Explanation Tab */}

              <ExplanationTab selectedText={selectedText} />
              {/* Page Range Summary Tab */}
              <PageRangeSummary documentId={docId} />
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}
