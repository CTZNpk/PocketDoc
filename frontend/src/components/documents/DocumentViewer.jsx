import React, { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import useDocs from '../../hooks/useDocs';
import { useParams } from 'react-router';
import Button from '../shared/Button';
import useSummary from '../../hooks/useSummary';


export default function DocumentViewer() {
  const [summaryText, setSummaryText] = useState("");
  const { generatePassageSummary } = useSummary();

  const handleButtonClick = async () => {
    const selected = window.getSelection().toString();
    const summary = await generatePassageSummary(selected);
    console.log(summary)
    setSummaryText(summary);
  };

  return (
    <div className='flex flex-col lg:flex-row bg-black justify-center'>
      <div className='flex-1'>
        <PdfViewer />
      </div>
      <div className='h-20 w-auto mr-20 mt-20 flex flex-col items-center justify-center min-h-screen'>
        <Button
          variant='secondary'
          className='mb-5 w-[10vw]'
          onClick={handleButtonClick}
        >
          Generate Summary
        </Button>
        <div className='border min-h-[70vh] w-[30vw] flex flex-col p-4 overflow-y-auto'>
          <h3 className='text-lg font-bold mb-4'>Selected Text:</h3>
          {summaryText ? (
            <p className='text-left text-white'>{summaryText}</p>
          ) : (
            <p className='text-gray-500 text-center'>No text selected.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const PdfViewer = () => {
  const { docId } = useParams();
  const [file, setFile] = useState(null);
  const { getDocumentFromId } = useDocs();

  useEffect(() => {
    const getFile = async () => {
      try {
        const arrayBuffer = await getDocumentFromId(docId);
        setFile(new Uint8Array(arrayBuffer));
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    getFile();

  }, []);
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    toolbarPlugin: {
      renderToolbar: (Toolbar) => (
        <Toolbar>
          {(slot) => (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#333',
                color: '#fff',
                padding: '10px',
              }}
            >
              {slot.zoomOutButton} {/* Zoom Out Button */}
              {slot.currentPageLabel} {/* Page Number */}
              {slot.zoomInButton} {/* Zoom In Button */}
              {slot.fullScreenButton} {/* Full-Screen Button */}
            </div>
          )}
        </Toolbar>
      ),
    },

    sidebarPlugin: {
      isOpen: false,
    },
  });

  return (
    file != null && (
      <div
        style={{
          margin: '10vh 5vw 0vh',
          height: '100vh',
          border: '1px solid #ccc',
          padding: '10px',
          overflow: 'auto',
          backgroundColor: '#121212',
          color: '#fff',
        }}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl={file}
            plugins={[defaultLayoutPluginInstance]}
            theme="dark"
          />
        </Worker>
      </div>
    )
  );;
}
