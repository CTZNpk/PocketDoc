import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronRight,
  ChevronLeft,
  Info,
  FileText,
  MessageSquare,
  Layers,
  Settings,
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import useDocs from "@/hooks/useDocs";
import useSummary from "@/hooks/useSummary";

export default function DocumentViewer() {
  const { generatePassageSummary } = useSummary();
  const [summaryText, setSummaryText] = useState(`
 *Summary will appear here*
  - Select text from the document
  - Adjust settings as needed
  - Click "Generate Summary"
  `);
  const [explanationText, setExplanationText] = useState(`
 *Explanation will appear here*
  - Select a complex concept or term
  - Click "Generate Explanation"
  `);
  const [pageRangeSummary, setPageRangeSummary] = useState(`
 *Page Range Summary will appear here*
  - Enter the start and end page numbers
  - Click "Generate Page Summary"
  `);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingExplanation, setIsGeneratingExplanation] = useState(false);
  const [isGeneratingPageSummary, setIsGeneratingPageSummary] = useState(false);

  const [summaryLength, setSummaryLength] = useState(75);
  const [summaryStyle, setSummaryStyle] = useState("balanced");
  const [includeKeyPoints, setIncludeKeyPoints] = useState(true);
  const [selectedText, setSelectedText] = useState("");
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState("summary");
  const [showPanel, setShowPanel] = useState(true);
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

  const getSummaryLengthLabel = (value) => {
    if (value <= 25) return "Concise";
    if (value <= 50) return "Brief";
    if (value <= 75) return "Standard";
    return "Detailed";
  };

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

  // Generate summary handler
  const handleSummaryGeneration = async () => {
    if (!selectedText) return;
    try {
      setIsGenerating(true);
      const summary = await generatePassageSummary(selectedText, {
        length: summaryLength,
        style: summaryStyle,
        includeKeyPoints,
      });
      setSummaryText(summary);
    } catch (error) {
      console.error("Error generating summary:", error);
      setSummaryText("**Error generating summary. Please try again.**");
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate explanation handler
  const handleExplanationGeneration = async () => {
    if (!selectedText) return;
    try {
      setIsGeneratingExplanation(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setExplanationText(`
## Explanation of "${selectedText.length > 30 ? selectedText.substring(0, 30) + "..." : selectedText}"

### What is this concept?
This is a detailed explanation of the selected concept or term. It provides context, background information, and helps the reader understand complex ideas.

### Why is it important?
The explanation covers the significance of this concept and how it relates to other important ideas in the document.

### Examples
1. Example one demonstrating practical application
2. Example two showing another perspective
3. Example three illustrating edge cases

### Further Reading
- Related concept one
- Connected theory two
- Additional resource three
      `);
    } catch (error) {
      console.error("Error generating explanation:", error);
      setExplanationText("**Error generating explanation. Please try again.**");
    } finally {
      setIsGeneratingExplanation(false);
    }
  };

  // Generate page range summary handler
  const handlePageRangeSummary = async () => {
    if (startPage > endPage || startPage < 1 || endPage > totalPages) {
      setPageRangeSummary("**Please enter a valid page range.**");
      return;
    }
    try {
      setIsGeneratingPageSummary(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setPageRangeSummary(`
## Summary of Pages ${startPage} to ${endPage}

This comprehensive summary covers the key content from pages ${startPage} through ${endPage} of the document.

### Main Topics
1. **First major topic** - Brief overview of the first significant subject covered in these pages
2. **Second major topic** - Summary of another important area discussed
3. **Third major topic** - Overview of additional significant content

### Key Findings
- Important finding one with context and implications
- Critical observation two with supporting details
- Essential conclusion three with relevant context

### Connections
This section connects to earlier content from the document by building on the foundation established previously, while setting up later discussions of related concepts.

${
  summaryStyle === "technical"
    ? "### Technical Details\n- Specific methodology described\n- Quantitative results summarized\n- Statistical significance noted"
    : ""
}
      `);
    } catch (error) {
      console.error("Error generating page range summary:", error);
      setPageRangeSummary(
        "**Error generating page range summary. Please try again.**",
      );
    } finally {
      setIsGeneratingPageSummary(false);
    }
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden relative">
      {/* PDF Viewer Area */}
      <div className="flex-1 transition-all duration-300">
        <PdfViewer
          onTotalPagesChange={setTotalPages}
          onCurrentPageChange={(pageNumber) => {
            if (endPage === 1) setEndPage(pageNumber);
          }}
        />
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
              <TabsContent
                value="summary"
                className="flex-1 p-4 overflow-y-auto"
              >
                <Card className="bg-zinc-900 border-zinc-800 shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-semibold text-white">
                        Document Summary
                      </CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-zinc-400"
                            >
                              <Info size={16} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-sm">
                            <p>
                              Select text from the document, adjust the summary
                              settings, then click Generate Summary.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-zinc-400 text-sm">
                      {selectedText
                        ? `${selectedText.length} characters selected`
                        : "Select text from the document for summarization"}
                    </p>
                  </CardHeader>
                  <Separator className="bg-zinc-800" />
                  <CardContent className="pt-4">
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full mb-4 text-zinc-300 border-zinc-700 bg-zinc-800"
                        >
                          <Settings className="mr-2 h-4 w-4" /> Summary Settings
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent className="bg-zinc-900 border-zinc-800">
                        <DrawerHeader>
                          <DrawerTitle className="text-white">
                            Summary Settings
                          </DrawerTitle>
                          <DrawerDescription className="text-zinc-400">
                            Customize how your summary is generated
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="px-4 py-2 space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label className="text-zinc-300">
                                Length: {getSummaryLengthLabel(summaryLength)}
                              </Label>
                              <span className="text-zinc-500 text-xs">
                                {summaryLength}%
                              </span>
                            </div>
                            <Slider
                              value={[summaryLength]}
                              min={1}
                              max={100}
                              step={1}
                              onValueChange={(value) =>
                                setSummaryLength(value[0])
                              }
                              className="w-full [&>span[role=slider]]:bg-cyan-600 [&>.range]:bg-cyan-600"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-zinc-300">
                              Summary Style
                            </Label>
                            <Select
                              value={summaryStyle}
                              onValueChange={setSummaryStyle}
                            >
                              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-200">
                                <SelectValue placeholder="Select style" />
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
                                <SelectItem value="balanced">
                                  Balanced
                                </SelectItem>
                                <SelectItem value="technical">
                                  Technical
                                </SelectItem>
                                <SelectItem value="simplified">
                                  Simplified
                                </SelectItem>
                                <SelectItem value="creative">
                                  Creative
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center justify-between space-x-2">
                            <div className="space-y-0.5">
                              <Label className="text-zinc-300">
                                Include Key Points
                              </Label>
                              <p className="text-zinc-500 text-xs">
                                Highlight essential information
                              </p>
                            </div>
                            <Switch
                              checked={includeKeyPoints}
                              onCheckedChange={setIncludeKeyPoints}
                            />
                          </div>
                        </div>
                        <DrawerFooter className="border-t border-zinc-800">
                          <DrawerClose asChild>
                            <Button
                              variant="default"
                              className="bg-cyan-600 hover:bg-cyan-700 text-white"
                            >
                              Save Settings
                            </Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                    <Button
                      variant="default"
                      className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-white"
                      onClick={handleSummaryGeneration}
                      disabled={isGenerating || !selectedText}
                    >
                      {isGenerating ? "Generating..." : "Generate Summary"}
                    </Button>
                    <ScrollArea className="mt-4 h-64">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {summaryText}
                      </ReactMarkdown>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Explanation Tab */}
              <TabsContent
                value="explain"
                className="flex-1 p-4 overflow-y-auto"
              >
                <Card className="bg-zinc-900 border-zinc-800 shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-semibold text-white">
                        Explanation
                      </CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-zinc-400"
                            >
                              <Info size={16} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-sm">
                            <p>
                              Select a term or concept from the document, then
                              click Generate Explanation.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-zinc-400 text-sm">
                      {selectedText
                        ? `${selectedText.length} characters selected`
                        : "Select text from the document for explanation"}
                    </p>
                  </CardHeader>
                  <Separator className="bg-zinc-800" />
                  <CardContent className="pt-4">
                    <Button
                      variant="default"
                      className="w-full mb-4 bg-cyan-600 hover:bg-cyan-700 text-white"
                      onClick={handleExplanationGeneration}
                      disabled={isGeneratingExplanation || !selectedText}
                    >
                      {isGeneratingExplanation
                        ? "Generating..."
                        : "Generate Explanation"}
                    </Button>
                    <ScrollArea className="h-64">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {explanationText}
                      </ReactMarkdown>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Page Range Summary Tab */}
              <TabsContent
                value="pageRange"
                className="flex-1 p-4 overflow-y-auto"
              >
                <Card className="bg-zinc-900 border-zinc-800 shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-semibold text-white">
                        Page Range Summary
                      </CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-zinc-400"
                            >
                              <Info size={16} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-sm">
                            <p>
                              Enter the start and end page numbers, then click
                              Generate Page Summary.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-zinc-400 text-sm">
                      Total Pages: {totalPages}
                    </p>
                  </CardHeader>
                  <Separator className="bg-zinc-800" />
                  <CardContent className="pt-4">
                    <div className="flex space-x-2 mb-4">
                      <Input
                        type="number"
                        value={startPage}
                        onChange={(e) => setStartPage(Number(e.target.value))}
                        placeholder="Start Page"
                        className="w-1/2 bg-zinc-800 border-zinc-700 text-white"
                      />
                      <Input
                        type="number"
                        value={endPage}
                        onChange={(e) => setEndPage(Number(e.target.value))}
                        placeholder="End Page"
                        className="w-1/2 bg-zinc-800 border-zinc-700 text-white"
                      />
                    </div>
                    <Button
                      variant="default"
                      className="w-full mb-4 bg-cyan-600 hover:bg-cyan-700 text-white"
                      onClick={handlePageRangeSummary}
                      disabled={isGeneratingPageSummary}
                    >
                      {isGeneratingPageSummary
                        ? "Generating..."
                        : "Generate Page Summary"}
                    </Button>
                    <ScrollArea className="h-64">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {pageRangeSummary}
                      </ReactMarkdown>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}

const PdfViewer = ({ onTotalPagesChange, onCurrentPageChange }) => {
  const { docId } = useParams();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getDocumentFromId } = useDocs();
  const viewerRef = useRef(null);

  useEffect(() => {
    const getFile = async () => {
      try {
        setIsLoading(true);
        const arrayBuffer = await getDocumentFromId(docId);
        setFile(new Uint8Array(arrayBuffer));
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getFile();
  }, []);

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    toolbarPlugin: {
      renderToolbar: (Toolbar) => (
        <Toolbar>
          {(slot) => (
            <div className="flex items-center justify-between bg-zinc-800 rounded-t-lg text-white p-3">
              <div className="flex items-center space-x-2">
                {slot.zoomOutButton}
                <span className="px-2 py-1 bg-zinc-700 rounded text-sm">
                  {slot.currentPageLabel}
                </span>
                {slot.zoomInButton}
              </div>
              <div className="flex items-center space-x-2">
                {slot.downloadButton}
                {slot.fullScreenButton}
                {slot.searchPopover}
              </div>
            </div>
          )}
        </Toolbar>
      ),
      searchPlugin: {
        enableShortcuts: true,
      },
    },
    sidebarPlugin: {
      isOpen: true,
      sidebarTab: {
        thumbnailTabContent: {
          thumbnailsTab: {
            backgroundColor: "#2a2a2a",
            color: "#fff",
          },
        },
      },
    },
    onDocumentLoad: ({ doc }) => {
      if (onTotalPagesChange) onTotalPagesChange(doc.numPages);
    },
    pageNavigationPlugin: {
      onPageChange: (e) => {
        if (onCurrentPageChange) onCurrentPageChange(e.currentPage);
      },
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-900">
        <div className="text-zinc-400">Loading document...</div>
      </div>
    );
  }

  return (
    file != null && (
      <div className="h-screen pt-6 pl-6 pb-6 pr-2">
        <Card className="h-full overflow-hidden border-zinc-800 bg-zinc-900 shadow-xl">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer
              fileUrl={file}
              plugins={[defaultLayoutPluginInstance]}
              theme="dark"
              renderLoader={(percentages) => (
                <div className="flex items-center justify-center h-full">
                  <p className="text-zinc-400">
                    Loading document... {Math.round(percentages)}%
                  </p>
                </div>
              )}
              ref={viewerRef}
            />
          </Worker>
        </Card>
      </div>
    )
  );
};
