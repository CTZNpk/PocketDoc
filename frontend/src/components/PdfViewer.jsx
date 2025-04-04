import { useParams } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { searchPlugin } from "@react-pdf-viewer/search";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import useDocs from "@/hooks/useDocs";
import { useEffect, useState } from "react";

const PdfViewer = () => {
  const { docId } = useParams();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getDocumentFromId } = useDocs();
  const searchInstance = searchPlugin();
  const { highlight } = searchInstance;

  useEffect(() => {
    const getFile = async () => {
      try {
        setIsLoading(true);
        const arrayBuffer = await getDocumentFromId(docId);
        setFile(new Uint8Array(arrayBuffer));
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getFile();
  }, []);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const highlights = [
          {
            page: 1,
            text: "Internet is a worldwide network",
          },
        ];

        highlights.forEach(({ text }) => {
          console.log(text);
          highlight([text]);
        });
      } catch (error) {
        console.error("Error fetching highlights:", error);
      }
    };

    if (file) {
      fetchHighlights();
    }
  }, [file]); // Runs when the file is loaded

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    toolbarPlugin: {
      renderToolbar: (Toolbar) => (
        <Toolbar>
          {(slot) => (
            <div className="flex items-center justify-between bg-zinc-800 rounded-t-lg text-white p-3">
              <div className="flex items-center space-x-2">
                {slot.zoomOutButton}
                <span className="px-2 py-1 bg-zinc-700 rounded text-sm">
                  {slot.currentPageLabel}
                </span>
                {slot.zoomInButton}
              </div>
              <div className="flex items-center space-x-2">
                {slot.downloadButton}
                {slot.fullScreenButton}
                {slot.searchPopover}
              </div>
            </div>
          )}
        </Toolbar>
      ),
      searchPlugin: {
        enableShortcuts: true,
      },
    },
    sidebarPlugin: {
      isOpen: true,
      sidebarTab: {
        thumbnailTabContent: {
          thumbnailsTab: {
            backgroundColor: "#2a2a2a",
            color: "#fff",
          },
        },
      },
    },
    onDocumentLoad: ({ doc }) => {
      if (onTotalPagesChange) onTotalPagesChange(doc.numPages);
    },
    pageNavigationPlugin: {
      onPageChange: (e) => {
        if (onCurrentPageChange) onCurrentPageChange(e.currentPage);
      },
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-900">
        <div className="text-zinc-400">Loading document...</div>
      </div>
    );
  }

  return (
    file != null && (
      <div className="h-screen pt-6 pl-6 pb-6 pr-2">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl={file}
            plugins={[defaultLayoutPluginInstance, searchInstance]}
            theme="dark"
            renderLoader={(percentages) => (
              <div className="flex items-center justify-center h-full">
                <p className="text-zinc-400">
                  Loading document... {Math.round(percentages)}%
                </p>
              </div>
            )}
          />
        </Worker>
      </div>
    )
  );
};
export default PdfViewer;
