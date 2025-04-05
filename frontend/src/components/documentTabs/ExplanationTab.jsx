import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import useSummary from "@/hooks/useSummary";
import GenericTabLayout from "./GenericTabLayout";

export default function ExplanationTab({ selectedText }) {
  const [explanationText, setExplanationText] = useState(`
 *Explanation will appear here*
  - Select a complex concept or term
  - Click "Generate Explanation"
  `);

  const { generatePassageExplanation } = useSummary();
  const [explanationLength, setExplanationLength] = useState("simple");

  const [showSettings, setShowSettings] = useState(false);

  const handleExplanationGeneration = async () => {
    const explanation = await generatePassageExplanation({
      passage: selectedText,
      detailLevel: explanationLength,
    });

    const cleanedMarkdown = explanation
      .replace(/^```(?:\w+)?\n/, "")
      .replace(/```$/, "");
    setExplanationText(cleanedMarkdown);
  };

  return (
    <GenericTabLayout
      value="explain"
      title="Explanation"
      generateFunction={handleExplanationGeneration}
      settingsComponent={
        <div>
          <Button
            variant="outline"
            className="w-full mb-4 text-zinc-300 border-zinc-700 "
            onClick={() => setShowSettings((prev) => !prev)}
          >
            <Settings className="mr-2 h-4 w-4" /> Explanation Settings
          </Button>

          {showSettings && (
            <div className="border border-zinc-800 rounded-lg px-4 py-4 space-y-4 mb-4">
              <h2 className="text-white text-lg font-semibold">
                Explanation Settings
              </h2>
              <p className="text-zinc-400 text-sm">
                Customize how your explanation is generated (optional)
              </p>

              {/* Explanation Depth */}
              <div className="space-y-2">
                <label className="text-zinc-300 block">Explanation Depth</label>
                <select
                  value={explanationLength}
                  onChange={(e) => setExplanationLength(e.target.value)}
                  className="border border-zinc-700 text-zinc-200 px-3 py-2 rounded w-full"
                >
                  <option value="simple">
                    Simple – Very easy to understand
                  </option>
                  <option value="medium">Medium – For students</option>
                  <option value="in-depth">
                    In-Depth – With examples and technical depth
                  </option>
                </select>
              </div>
            </div>
          )}

          {
            //       {/* Ask a Question */}
            //   <div className="space-y-2 mb-5">
            //     <label className="text-zinc-300 block">
            //       Ask a Question
            //     </label>
            //     <input
            //       type="text"
            //       placeholder="E.g. What does this concept mean in context?"
            //       value={explanationQuery}
            //       onChange={(e) => setExplanationQuery(e.target.value)}
            //       className="border border-zinc-700 text-zinc-200 px-3 py-2 rounded w-full placeholder-zinc-500"
            //     />
            //   </div>
          }
        </div>
      }
      selectedText={selectedText}
      text={explanationText}
    />
  );
}
