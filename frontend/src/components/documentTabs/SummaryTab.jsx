import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import useSummary from "@/hooks/useSummary";
import GenericTabLayout from "./GenericTabLayout";

export default function SummaryTab({ selectedText }) {
  const [summaryText, setSummaryText] = useState(`
 *Summary will appear here*
  - Select text from the document
  - Adjust settings as needed
  - Click "Generate Summary"
  `);

  const { generatePassageSummary } = useSummary();
  const [showSettings, setShowSettings] = useState(false);
  const [documentType, setDocumentType] = useState("general");
  const [summaryLength, setSummaryLength] = useState(20);
  const [formatPreference, setFormatPreference] = useState("outline");
  const [focus, setFocus] = useState("main ideas");

  const handleSummaryGeneration = async () => {
    const summary = await generatePassageSummary({
      passage: selectedText,
      summaryLength,
      formatPreference,
      focus,
      documentType,
    });

    console.log(summary);
    const cleanedMarkdown = summary
      .replace(/^```(?:\w+)?\n/, "")
      .replace(/```$/, "");
    setSummaryText(cleanedMarkdown);
  };

  return (
    <GenericTabLayout
      value="summary"
      title="Passage Summary"
      generateFunction={handleSummaryGeneration}
      settingsComponent={
        <div>
          <Button
            variant="outline"
            className="w-full mb-4 text-zinc-300 border-zinc-700 "
            onClick={() => setShowSettings((prev) => !prev)}
          >
            <Settings className="mr-2 h-4 w-4" /> Summary Settings
          </Button>
          {showSettings && (
            <div className="border border-zinc-800 rounded-lg px-4 py-4 space-y-4 mb-4">
              <h2 className="text-white text-lg font-semibold">
                Summary Settings
              </h2>
              <p className="text-zinc-400 text-sm">
                Customize how your summary is generated
              </p>

              {/* Document Type */}
              <div className="space-y-2">
                <label className="text-zinc-300 block">Document Type</label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="border border-zinc-700 text-zinc-200 px-3 py-2 rounded w-full"
                >
                  <option value="general">General</option>
                  <option value="technical">Technical</option>
                </select>
              </div>

              {/* Summary Length */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-zinc-300">
                    Summary Length: {summaryLength}%
                  </label>
                </div>
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
              <div className="space-y-2">
                <label className="text-zinc-300 block">Format Preference</label>
                <select
                  value={formatPreference}
                  onChange={(e) => setFormatPreference(e.target.value)}
                  className="border border-zinc-700 text-zinc-200 px-3 py-2 rounded w-full"
                >
                  <option value="outline">Outline</option>
                  <option value="bullet">Bullet</option>
                  <option value="paragraph">Paragraph</option>
                </select>
              </div>

              {/* Focus */}
              <div className="space-y-2">
                <label className="text-zinc-300 block">Focus</label>
                <select
                  value={focus}
                  onChange={(e) => setFocus(e.target.value)}
                  className="border border-zinc-700 text-zinc-200 px-3 py-2 rounded w-full"
                >
                  <option value="main ideas">Main Ideas</option>
                  <option value="definitions">Definitions</option>
                  <option value="concepts">Concepts</option>
                </select>
              </div>
            </div>
          )}
        </div>
      }
      selectedText={selectedText}
      text={summaryText}
    />
  );
}
