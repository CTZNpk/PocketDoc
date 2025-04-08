import { useState, useEffect, useRef } from "react";
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
  Search,
} from "lucide-react";
import PdfViewer from "@/components/PdfViewer";
import SummaryTab from "@/components/documentTabs/SummaryTab";
import ExplanationTab from "@/components/documentTabs/ExplanationTab";
import PageRangeSummary from "@/components/documentTabs/PageRangeSummary";
import { useParams } from "react-router";
import QueryTab from "@/components/documentTabs/QueryTab";
import useDocs from "@/hooks/useDocs";
import { FaQuestion } from "react-icons/fa";
import QuizTab from "@/components/documentTabs/QuizTab";
import Background from "@/components/Background";

export default function DocumentViewer() {
  const { docId } = useParams();

  const [selectedText, setSelectedText] = useState("");
  const [activeTab, setActiveTab] = useState("summary");
  const [showPanel, setShowPanel] = useState(true);
  const [documentMeta, setDocumentMeta] = useState({});
  const { getDocumentMetaData } = useDocs();

  const [panelWidth, setPanelWidth] = useState(384);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      const selected = selection.toString().trim();

      if (!selected) return;

      const anchorNode = selection.anchorNode;
      if (!pdfContainerRef.current.contains(anchorNode)) return;

      setSelectedText(selected);
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", handleSelectionChange);
  }, []);

  const handleDragStart = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleDragging);
    document.addEventListener("mouseup", handleDragEnd);
  };
  const pdfContainerRef = useRef(null);

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

  useEffect(() => {
    const getFile = async () => {
      try {
        const document = await getDocumentMetaData(docId);
        setDocumentMeta(document.document);
        console.log(document);
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
    getFile();
  }, []);

  return (
    <Background>
      <div className="flex h-screen overflow-hidden relative">
        <div
          className="flex-1 transition-all duration-300"
          ref={pdfContainerRef}
        >
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
            className="relative border-l border-zinc-800 shadow-xl transition-all duration-300"
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
                <TabsList className="grid grid-cols-5 mx-4 mt-4">
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

                  <TabsTrigger
                    value="query"
                    className="flex items-center gap-2"
                  >
                    <Search size={16} />
                    <span className="hidden sm:inline">Query</span>
                  </TabsTrigger>

                  <TabsTrigger value="quiz" className="flex items-center gap-2">
                    <FaQuestion size={16} />
                    <span className="hidden sm:inline">Quiz</span>
                  </TabsTrigger>
                </TabsList>

                {/* Summary Tab */}
                <SummaryTab selectedText={selectedText} />

                {/* Explanation Tab */}

                <ExplanationTab selectedText={selectedText} />
                {/* Page Range Summary Tab */}
                <PageRangeSummary documentId={docId} />
                <QueryTab
                  document={documentMeta}
                  setDocument={setDocumentMeta}
                />
                <QuizTab documentId={documentMeta._id} />
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </Background>
  );
}
