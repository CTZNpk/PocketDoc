import React, { useEffect, useState } from "react";
import useDocs from "../../hooks/useDocs";
import { emitToast } from "../../utils/emitToast";
import { useNavigate, useParams } from "react-router";
import Button from "../shared/Button";
import useSummary from "@/hooks/useSummary";

const DocumentToc = () => {
  const { docId } = useParams();
  const { getDocumentToc } = useDocs();
  const [toc, setToc] = useState([]);
  const [expanded, setExpanded] = useState(() =>
    toc.reduce((acc, chapter) => {
      acc[chapter.id] = false;
      return acc;
    }, {}),
  );
  const [startPage, setStartPage] = useState("");
  const [endPage, setEndPage] = useState("");
  const navigate = useNavigate();
  const { generateSummaryPages } = useSummary();

  useEffect(() => {
    const fetchToc = async () => {
      try {
        const fetchedToc = await getDocumentToc(docId);
        setToc(fetchedToc);
      } catch (err) {
        emitToast(`Failed to load Toc: ${err}`);
      }
    };
    fetchToc();
    console.log(toc);
  }, [docId]);

  const toggleExpand = (id) => {
    console.log(id);
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleGenerateSummary = (chapter) => {
    console.log(chapter.id);
    navigate(`/document/chapter/${chapter.id}`);
  };

  const handleCustomPageSummary = () => {
    if (!startPage || !endPage) {
      emitToast("Please enter both start and end page numbers");
      return;
    }

    if (parseInt(startPage) > parseInt(endPage)) {
      emitToast("Start page cannot be greater than end page");
      return;
    }

    navigate(
      `/document/${docId}/summary?startPage=${startPage}&endPage=${endPage}`,
    );
  };

  const navigateToDocViewer = () => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace("toc", "");
    navigate(newPath);
  };

  return (
    <div className="bg-black text-white min-h-screen m-0">
      <div className="p-5 max-w-2xl mx-auto">
        <div className="flex justify-center items-center mt-20 mb-6">
          <h1 className="text-2xl font-bold">Document Table of Contents</h1>
          <Button
            variant="secondary"
            className="flex-1 ml-20"
            onClick={navigateToDocViewer}
          >
            {" "}
            Read Document
          </Button>
        </div>

        {/* Custom Page Range Summary Generator */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-3">
            Generate Custom Page Range Summary
          </h2>
          <div className="flex items-center gap-4">
            <div>
              <label htmlFor="startPage" className="block text-sm mb-1">
                Start Page:
              </label>
              <input
                id="startPage"
                type="number"
                min="1"
                value={startPage}
                onChange={(e) => setStartPage(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded text-white w-24"
              />
            </div>
            <div>
              <label htmlFor="endPage" className="block text-sm mb-1">
                End Page:
              </label>
              <input
                id="endPage"
                type="number"
                min="1"
                value={endPage}
                onChange={(e) => setEndPage(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded text-white w-24"
              />
            </div>
            <div className="self-end">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-5"
                onClick={handleCustomPageSummary}
              >
                Generate Summary
              </button>
            </div>
          </div>
        </div>

        <ul className="list-none p-0">
          {toc.map((chapter) => (
            <li key={chapter.id} className="border-b border-gray-300 pb-3 mb-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <strong className="text-lg">{chapter.title}</strong>
                  <p className="text-gray-600">
                    Pages: {chapter.startPage} - {chapter.endPage}
                  </p>
                </div>
                <div className="flex-1">
                  <button
                    className={`px-4 py-2 rounded text-white ${
                      expanded[chapter.id]
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    onClick={() => toggleExpand(chapter.id)}
                  >
                    {expanded[chapter.id] ? "Collapse" : "Expand"}
                  </button>
                  <button
                    className="px-4 py-2 ml-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleGenerateSummary(chapter)}
                  >
                    Generate Summary
                  </button>
                </div>
              </div>
              {expanded[chapter.id] && chapter.subChapters.length > 0 && (
                <ul className="list-none pl-5 mt-3">
                  {chapter.subChapters.map((subChapter) => (
                    <li key={subChapter.id} className="mb-2">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <strong className="text-base">
                            {subChapter.title}
                          </strong>
                          <p className="text-gray-600">
                            Pages: {subChapter.startPage} - {subChapter.endPage}
                          </p>
                        </div>
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                          onClick={() => handleGenerateSummary(subChapter)}
                        >
                          Generate Summary
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DocumentToc;
