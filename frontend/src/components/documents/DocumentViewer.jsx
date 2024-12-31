import React, { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import useDocs from '../../hooks/useDocs';
import { useParams } from 'react-router';


export default function DocumentViewer() {
  return (
    <div className='flex flex-col bg-black'>
      <PdfViewer />
    </div>
  )
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
          margin: '10vh 10vw 0vh',
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
