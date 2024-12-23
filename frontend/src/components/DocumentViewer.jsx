import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfViewer = () => {
  // Customize the default layout plugin
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
      isOpen: false, // Sidebar is hidden by default
    },
  });

  return (
    <div
      style={{
        margin: '0 auto',
        height: '100vh',
        border: '1px solid #ccc',
        padding: '10px',
        overflow: 'auto',
        backgroundColor: '#121212', // Viewer background for dark mode
        color: '#fff', // Text color for dark mode
      }}
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl="/pdf/test.pdf"
          plugins={[defaultLayoutPluginInstance]}
          theme="dark" // Set the Viewer theme to dark
        />
      </Worker>
    </div>
  );
};

export default PdfViewer;

