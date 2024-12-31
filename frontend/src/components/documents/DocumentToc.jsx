import React, { useState } from "react";

const DocumentToc = () => {
  const toc = [
    {
      id: 1,
      title: "Chapter 1: Introduction",
      startPage: 1,
      endPage: 5,
      subChapters: [
        { id: 11, title: "1.1 Background", startPage: 2, endPage: 3 },
        { id: 12, title: "1.2 Objectives", startPage: 4, endPage: 5 },
      ],
    },
    {
      id: 2,
      title: "Chapter 2: Literature Review",
      startPage: 6,
      endPage: 15,
      subChapters: [
        { id: 21, title: "2.1 Previous Studies", startPage: 7, endPage: 10 },
        { id: 22, title: "2.2 Theoretical Framework", startPage: 11, endPage: 15 },
      ],
    },
  ];

  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Placeholder function for generating summary
  const handleGenerateSummary = (chapter) => {
    alert(`Generating summary for ${chapter.title}`);
  };

  return (
    <div className="bg-black text-white min-h-screen m-0">
      <div className="p-5 max-w-2xl mx-auto ">
        <h1 className="text-2xl font-bold mb-6">Document Table of Contents</h1>
        <ul className="list-none p-0">
          {toc.map((chapter) => (
            <li
              key={chapter.id}
              className="border-b border-gray-300 pb-3 mb-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <strong className="text-lg">{chapter.title}</strong>
                  <p className="text-gray-600">
                    Pages: {chapter.startPage} - {chapter.endPage}
                  </p>
                </div>
                <div>
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
              {/* Show Level 2 headings if expanded */}
              {expanded[chapter.id] && chapter.subChapters.length > 0 && (
                <ul className="list-none pl-5 mt-3">
                  {chapter.subChapters.map((subChapter) => (
                    <li key={subChapter.id} className="mb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <strong className="text-base text-gray-800">
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

