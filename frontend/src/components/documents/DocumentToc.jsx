import React, { useEffect, useState } from "react";
import useDocs from "../../hooks/useDocs";
import { emitToast } from "../../utils/emitToast";
import { useNavigate, useParams } from "react-router";
import Button from "../shared/Button";

const DocumentToc = () => {
  const { docId } = useParams();
  const { getDocumentToc } = useDocs();
  const [toc, setToc] = useState([]);
  const [expanded, setExpanded] = useState(() =>
    toc.reduce((acc, chapter) => {
      acc[chapter.id] = false;
      return acc;
    }, {})
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToc = async () => {
      try {
        const fetchedToc = await getDocumentToc(docId);
        setToc(fetchedToc);
      } catch (err) {
        emitToast(`Failed to load Toc: ${err}`)
      }
    };
    fetchToc();
    console.log(toc)
  }, [docId]);

  const toggleExpand = (id) => {
    console.log(id)
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleGenerateSummary = (chapter) => {
    console.log(chapter.id)
    navigate(`/document/chapter/${chapter.id}`);
  };

  const navigateToDocViewer = () => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace('toc', '')
    navigate(newPath)
  }

  return (
    <div className="bg-black text-white min-h-screen m-0">
      <div className="p-5 max-w-2xl mx-auto ">
        <div className="flex justify-center items-center mt-20 mb-6">
          <h1 className="text-2xl font-bold ">Document Table of Contents</h1>
          <Button variant="secondary" className="flex-1 ml-20"
            onClick={navigateToDocViewer}
          > Read Document</Button>
        </div>
        <ul className="list-none p-0">
          {toc.map((chapter) => (
            <li
              key={chapter.id}
              className="border-b border-gray-300 pb-3 mb-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <strong className="text-lg">{chapter.title}</strong>
                  <p className="text-gray-600">
                    Pages: {chapter.startPage} - {chapter.endPage}
                  </p>
                </div>
                <div className="flex-1">
                  <button
                    className={`px-4 py-2 rounded text-white ${expanded[chapter.id]
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
                          <strong className="text-base ">
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

