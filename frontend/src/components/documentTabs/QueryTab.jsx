import { useState } from "react";
import { Button } from "@/components/ui/button";
import useSummary from "@/hooks/useSummary";
import GenericTabLayout from "./GenericTabLayout";
import useDocs from "@/hooks/useDocs";
import { Input } from "@/components/ui/input";

export default function QueryTab({ document, setDocument }) {
  const [answer, setAnswer] = useState(`
 *Summary will appear here*
  - Select text from the document
  - Adjust settings as needed
  - Click "Generate Summary"
  `);

  const { generateDocumentEmbeddings } = useDocs();
  const [isGenerating, setIsGenerating] = useState(false);
  const { generateQuerySummary } = useSummary();
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [questionQuery, setQuestionQuery] = useState();

  const handleQueryAnswer = async () => {
    const response = await generateQuerySummary({
      documentId: document._id,
      query: questionQuery,
      startPage,
      endPage,
    });
    const answer = response.answer;

    const cleanedMarkdown = answer
      .replace(/^```(?:\w+)?\n/, "")
      .replace(/```$/, "");
    setAnswer(cleanedMarkdown);
  };

  const generateEmbeddings = async () => {
    setIsGenerating(true);
    const newDoc = await generateDocumentEmbeddings(document._id);
    setDocument((oldDoc) => ({
      ...oldDoc,
      hasEmbeddings: newDoc.hasEmbeddings,
    }));
    setIsGenerating(false);
  };

  return (
    <GenericTabLayout
      value="query"
      title="Query Summary"
      generateFunction={handleQueryAnswer}
      settingsComponent={
        <div>
          {!document.hasEmbeddings && (
            <Button
              variant="default"
              className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-white"
              onClick={generateEmbeddings}
            >
              {isGenerating
                ? "Generating Embeddings..."
                : "Generate Embeddings"}
            </Button>
          )}
          {document.hasEmbeddings && (
            <div>
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
              <div className="space-y-2 mb-5">
                <label className="text-zinc-300 block">Ask a Question</label>
                <input
                  type="text"
                  placeholder="What does Penetration Testing mean?"
                  value={questionQuery}
                  onChange={(e) => setQuestionQuery(e.target.value)}
                  className="bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-2 rounded w-full placeholder-zinc-500"
                />
              </div>
            </div>
          )}
        </div>
      }
      selectedText={"."}
      text={answer}
      showGenerateSummary={document.hasEmbeddings}
    />
  );
}
