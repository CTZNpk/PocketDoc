import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ReactMarkdown from "react-markdown";

const TextSummarizer = () => {
  // State for input text
  const [inputText, setInputText] = useState("");

  // Summary settings
  const [summaryLength, setSummaryLength] = useState(75);
  const [summaryStyle, setSummaryStyle] = useState("balanced");
  const [includeKeyPoints, setIncludeKeyPoints] = useState(true);

  // Summary result
  const [summaryText, setSummaryText] = useState(`
*Summary will appear here*
- Enter your text on the left side
- Adjust settings as needed
- Click "Generate Summary"
  `);
  const [isGenerating, setIsGenerating] = useState(false);

  // Character count
  const charCount = inputText.length;

  // Handle summary generation
  const handleSummaryGeneration = async () => {
    if (!inputText.trim()) return;

    try {
      setIsGenerating(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      let generatedSummary = "";

      generatedSummary = ` Word count: approximately ${Math.round((charCount * (summaryLength / 100)) / 5)} words (${summaryLength}% of original)`;

      setSummaryText(generatedSummary);
    } catch (error) {
      console.error("Error generating summary:", error);
      setSummaryText("**Error generating summary. Please try again.**");
    } finally {
      setIsGenerating(false);
    }
  };

  const getSummaryLengthLabel = (value) => {
    if (value <= 25) return "Concise";
    if (value <= 50) return "Brief";
    if (value <= 75) return "Standard";
    return "Detailed";
  };

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      {/* Input Area (Left Side) */}
      <div className="w-1/2 p-6 border-r border-zinc-800">
        <Card className="h-full bg-zinc-900 border-zinc-800 shadow-xl">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-semibold text-white">
                Input Text
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
                  <TooltipContent className="max-w-sm bg-zinc-800 text-zinc-200">
                    <p>Enter the text you want to summarize here.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-zinc-400 text-sm">
              {charCount > 0
                ? `${charCount} characters`
                : "Enter text to summarize"}
            </p>
          </CardHeader>
          <Separator className="bg-zinc-800" />
          <CardContent className="pt-4 h-[calc(100%-90px)]">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or type your text here..."
              className="w-full h-full p-4 bg-zinc-800 border border-zinc-700 rounded-md text-zinc-200 focus:outline-none focus:ring-2 focus:ring-cyan-600 resize-none"
            />
          </CardContent>
        </Card>
      </div>

      {/* Summary Area (Right Side) */}
      <div className="w-1/2 p-6">
        <Card className="h-full bg-zinc-900 border-zinc-800 shadow-xl">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-semibold text-white">
                Summary
              </CardTitle>
              <div className="flex space-x-2">
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-zinc-300 border-zinc-700 bg-zinc-800"
                    >
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="bg-zinc-900 border-zinc-800 text-white">
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
                          onValueChange={(value) => setSummaryLength(value[0])}
                          className="w-full [&>span[role=slider]]:bg-cyan-600 [&>.range]:bg-cyan-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-zinc-300">Summary Style</Label>
                        <Select
                          value={summaryStyle}
                          onValueChange={setSummaryStyle}
                        >
                          <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-200">
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
                            <SelectItem value="balanced">Balanced</SelectItem>
                            <SelectItem value="technical">Technical</SelectItem>
                            <SelectItem value="simplified">
                              Simplified
                            </SelectItem>
                            <SelectItem value="creative">Creative</SelectItem>
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
              </div>
            </div>
          </CardHeader>
          <Separator className="bg-zinc-800" />
          <CardContent className="pt-4 flex flex-col h-[calc(100%-90px)]">
            <Button
              variant="default"
              className="w-full mb-4 bg-cyan-600 hover:bg-cyan-700 text-white"
              onClick={handleSummaryGeneration}
              disabled={isGenerating || !inputText.trim()}
            >
              {isGenerating ? "Generating..." : "Generate Summary"}
            </Button>
            <ScrollArea className="flex-1 pr-4">
              <div className="text-zinc-200">
                <ReactMarkdown>{summaryText}</ReactMarkdown>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TextSummarizer;
