import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";

export default function GenericTabLayout({
  selectedText,
  generateFunction,
  text,
  title,
  settingsComponent,
  value,
  redirectToPage = false,
  redirectFunction,
  documentId,
  showGenerateSummary = true,
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGeneration = async () => {
    if (!selectedText && !documentId) return;
    setIsGenerating(true);
    await generateFunction();
    setIsGenerating(false);
  };
  
  return (
    <TabsContent value={value} className="flex-1 w-full p-0 sm:p-2 md:p-4 overflow-hidden">
      <Card className="border-zinc-800 shadow-lg w-full h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold text-white">
              {title}
            </CardTitle>
          </div>
          <p className="text-zinc-400 text-sm">
            {selectedText
              ? `${selectedText.length} characters selected`
              : documentId
                ? ""
                : "Select text from the document for summarization"}
          </p>
        </CardHeader>
        <Separator className="bg-zinc-800" />
        <CardContent className="pt-4 flex-1 flex flex-col overflow-hidden">
          {settingsComponent}
          {showGenerateSummary && (
            <Button
              variant="default"
              className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-white"
              onClick={handleGeneration}
              disabled={isGenerating || (!selectedText && !documentId)}
            >
              {isGenerating ? "Generating..." : "Generate"}
            </Button>
          )}
          {redirectToPage && text && !isGenerating && (
            <Button
              variant="outline"
              className="w-full mb-4 text-cyan-500 border-cyan-700 hover:bg-zinc-800 mt-4"
              onClick={redirectFunction}
            >
              View Full Summary
            </Button>
          )}
          <h1 className="pt-5">Length: {text.length} characters</h1>
          <div className="flex-1 w-full mt-3 overflow-hidden">
            <div className="h-full max-h-[calc(100vh-350px)] overflow-y-auto pr-1">
              <div className="prose prose-invert max-w-none w-full break-words">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {text}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
