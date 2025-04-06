import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import useSummary from "@/hooks/useSummary";
import ThemeButton from "@/components/Button";
import { Download } from "lucide-react";

const SummaryDisplay = () => {
  const { summaryId } = useParams();
  const [characterCount, setCharacterCount] = useState(1200);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(0);
  const [summary, setSummary] = useState("");
  const [documentTitle, setDocumentTitle] = useState("Untitled");
  const [metadata, setMetadata] = useState(null);

  const navigateBack = () => {
    navigate(`/myDocuments`);
  };

  const { getSummaryId, downloadSummaryFromId } = useSummary();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = await getSummaryId(summaryId);

      const cleanedMarkdown = response.summary
        .replace(/^```(?:\w+)?\n/, "")
        .replace(/```$/, "");
      setMetadata(response.metadata);
      setSummary(cleanedMarkdown);
      setStartPage(response.startPage);
      setEndPage(response.endPage);
      setCharacterCount(response.summary.length);
      setDocumentTitle(response.document.title); // <- assume API returns this
      setLoading(false);
    };
    fetch();
  }, []);

  const downloadSummary = () => {
    downloadSummaryFromId(summaryId);
  };

  return (
    <div className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white min-h-screen pt-20">
      <div className="px-6 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400">
              Document Summary
            </h1>
            <p className="text-gray-400 text-sm mt-1">{documentTitle}</p>
          </div>
          <div className="flex justify-center">
            <ThemeButton
              variant="primary"
              onClick={navigateBack}
              className="p-3 mr-4"
            >
              Back to Summaries
            </ThemeButton>

            <ThemeButton
              variant="secondary"
              onClick={downloadSummary}
              className="p-3"
            >
              <Download className="h-5" />
            </ThemeButton>
          </div>
        </div>

        {/* Metadata Display */}
        {metadata && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-gray-800/60 p-5 rounded-lg mb-8 text-sm text-gray-300">
            <div>
              <span className="font-semibold text-white">Document Type:</span>{" "}
              {metadata.documentType}
            </div>
            <div>
              <span className="font-semibold text-white">
                Summary Percentage:
              </span>{" "}
              {metadata.summaryLength}%
            </div>
            <div>
              <span className="font-semibold text-white">
                Format Preference:
              </span>{" "}
              {metadata.formatPreference}
            </div>
            <div>
              <span className="font-semibold text-white">Focus Area:</span>{" "}
              {metadata.focusArea}
            </div>
            <div>
              <span className="font-semibold text-white">Generated At:</span>{" "}
              {new Date(metadata.generatedAt).toLocaleString()}
            </div>
          </div>
        )}

        <div className="bg-gray-800/60 p-5 rounded-lg mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Summary for Pages {startPage} - {endPage}
            </h2>
            <div className="bg-gray-700 px-3 py-1 rounded-full text-sm">
              {characterCount.toLocaleString()} characters
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : (
          <div className="w-full">
            <div className="p-6 prose prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={atomDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {summary}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryDisplay;
