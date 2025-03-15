import { useState, useEffect } from "react";
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
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useDocs from "@/hooks/useDocs";

export default function DocumentViewer() {
  const [summaryText, setSummaryText] = useState(`
 *Test Heading*
  - **This is bold text**
  - Regular list item
  `);
  const [isGenerating, setIsGenerating] = useState(false);
  const [summaryLength, setSummaryLength] = useState(75); // Default to medium length (1-100 scale)
  const [summaryStyle, setSummaryStyle] = useState("balanced"); // balanced, technical, simplified
  const [includeKeyPoints, setIncludeKeyPoints] = useState(true);
  const [selectedText, setSelectedText] = useState("");

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

  const handleButtonClick = async () => {
    if (!selectedText) {
      return;
    }

    try {
      setIsGenerating(true);

      // Pass the configuration options to the API
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

  return (
    <div className="flex flex-col lg:flex-row bg-black min-h-screen">
      <div className="flex-1 lg:max-w-2/3 mt-12">
        <PdfViewer />
      </div>

      <div className="lg:w-1/3 p-6 flex flex-col">
        <Card className="bg-zinc-900 border-zinc-800 shadow-lg mt-6 lg:mt-12">
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
            <Tabs defaultValue="settings" className="mb-4">
              <TabsContent value="settings" className="py-2 space-y-4">
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
                    onValueChange={(value) => setSummaryLength(value[0])}
                    className="w-full [&>span[role=slider]]:bg-indigo-600 [&>.range]:bg-indigo-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-300">Summary Style</Label>
                  <Select value={summaryStyle} onValueChange={setSummaryStyle}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-200">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="simplified">Simplified</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="py-2 space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label className="text-zinc-300">Include Key Points</Label>
                    <p className="text-zinc-500 text-xs">
                      Highlight essential information
                    </p>
                  </div>
                  <Switch
                    checked={includeKeyPoints}
                    onCheckedChange={setIncludeKeyPoints}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Button
              variant="default"
              className="w-full mb-4 bg-indigo-600 hover:bg-indigo-700 text-white relative"
              onClick={handleButtonClick}
              disabled={!selectedText || isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Summary"}
            </Button>

            <Card className="border border-zinc-800 bg-zinc-950">
              <ScrollArea className="h-[50vh] w-full px-1">
                <div className="p-4">
                  <ReactMarkdown
                    className="text-zinc-200 prose prose-invert prose-sm max-w-none"
                    remarkPlugins={[remarkGfm]}
                  >
                    {summaryText}
                  </ReactMarkdown>
                </div>
              </ScrollArea>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const PdfViewer = () => {
  const { docId } = useParams();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getDocumentFromId } = useDocs();

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
            />
          </Worker>
        </Card>
      </div>
    )
  );
};
