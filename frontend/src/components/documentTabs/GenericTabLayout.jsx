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
    <TabsContent value={value} className="flex-1 p-4 overflow-y-auto">
      <Card className="bg-zinc-900 border-zinc-800 shadow-lg">
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
        <CardContent className="pt-4">
          {settingsComponent}
          {showGenerateSummary && (
            <Button
              variant="default"
              className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-white"
              onClick={handleGeneration}
              disabled={isGenerating || (!selectedText && !documentId)}
            >
              {isGenerating ? "Generating..." : "Generate Summary"}
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
          <div className="max-h-[calc(100vh-250px)] mt-5 pb-10 overflow-y-auto">
            <div className="prose prose-invert max-w-full w-full break-words">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
