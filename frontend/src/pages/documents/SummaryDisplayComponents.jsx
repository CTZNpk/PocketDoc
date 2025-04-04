import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import useSummary from "@/hooks/useSummary";
import { emitToast } from "../../utils/emitToast";
import { useNavigate } from "react-router-dom";
import ThemeButton from "@/components/Button";

const SummaryDisplay = () => {
  const { docId } = useParams();
  const [searchParams] = useSearchParams();
  const startPage = searchParams.get("startPage");
  const endPage = searchParams.get("endPage");
  const [summary, setSummary] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { generateSummaryPages } = useSummary();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        console.log("PAGES ");
        console.log(startPage);
        console.log(endPage);
        const summaryData = await generateSummaryPages(
          docId,
          startPage,
          endPage,
        );
        setSummary(summaryData);

        // Calculate word count
        if (summaryData) {
          // Count words by splitting on whitespace and filtering out empty strings
          const words = summaryData
            .split(/\s+/)
            .filter((word) => word.length > 0);
          setWordCount(words.length);
        }
      } catch (err) {
        emitToast(`Failed to generate summary: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    if (docId && startPage && endPage) {
      fetchSummary();
    } else {
      emitToast("Missing required parameters");
      navigate(`/document/${docId}/toc`);
    }
  }, []);

  const navigateBack = () => {
    navigate(`/document/${docId}/toc`);
  };

  return (
    <div className="bg-black text-white min-h-screen mt-16">
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Document Summary</h1>
          <ThemeButton variant="secondary" onClick={navigateBack}>
            Back to Table of Contents
          </ThemeButton>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl">
              Summary for Pages {startPage} - {endPage}
            </h2>
            <div className="bg-gray-700 px-3 py-1 rounded-full text-sm">
              {wordCount.toLocaleString()} words
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="p-6 markdown-body">
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
                  h1: ({ node, ...props }) => (
                    <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-xl font-bold mt-5 mb-3" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-lg font-bold mt-4 mb-2" {...props} />
                  ),
                  h4: ({ node, ...props }) => (
                    <h4 className="text-base font-bold mt-3 mb-2" {...props} />
                  ),
                  p: ({ node, ...props }) => <p className="my-3" {...props} />,
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-5 my-3" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-5 my-3" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="ml-2 my-1" {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      className="text-blue-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      className="border-l-4 border-gray-500 pl-4 my-3 italic"
                      {...props}
                    />
                  ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-4">
                      <table
                        className="min-w-full border-collapse border border-gray-700"
                        {...props}
                      />
                    </div>
                  ),
                  thead: ({ node, ...props }) => (
                    <thead className="bg-gray-800" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th
                      className="border border-gray-700 px-4 py-2 text-left"
                      {...props}
                    />
                  ),
                  td: ({ node, ...props }) => (
                    <td
                      className="border border-gray-700 px-4 py-2"
                      {...props}
                    />
                  ),
                  hr: ({ node, ...props }) => (
                    <hr className="my-4 border-gray-600" {...props} />
                  ),
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
