import React, { useState } from 'react'
import styled from 'styled-components';
import "./documentUpload.css"

import { FileUploader } from "react-drag-drop-files";
import Button from '../shared/Button';
import { FaFilePdf } from "react-icons/fa";
import { emitToast } from '../../utils/emitToast';
import useDocs from '../../hooks/useDocs';

const fileTypes = ["PDF"];

function DragDrop({ setFile, file }) {

  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} classes="custom-drop-area"
      children={

        file != null ?
          <div className='text-white'><p>Document Uploaded</p></div>
          :
          <div><p>Click Here Or Drop Files To Upload</p></div>
      }
    />

  );
}

export default function DocumentUploadPage({ onClose }) {
  const [file, setFile] = useState(null);
  const { uploadDoc } = useDocs();

  const confirmUpload = async () => {
    if (!file) {
      emitToast("Please Select a File")
    }
    await uploadDoc(file, file.name);

    onClose()

  };

  return (
    <div className="flex justify-center items-center text-white bg-black">
      <StyledWrapper>
        <div className='relative'>
          <button
            onClick={onClose}
            className="absolute top-10 right-10 text-white z-10 text-xl"
            aria-label="Close"
          >
            ✖
          </button>
          <div
            className="flex flex-col package2 relative rounded-lg overflow-hidden bg-gray-200 
            shadow-lg hover:shadow-xl transition-shadow justify-center items-center p-4">
            <h1 className="mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
              Upload Document
            </h1>
            <div className='flex flex-col lg:flex-row gap-6 w-full mt-6 p-8 h-full'>
              <DragDrop setFile={setFile} file={file} />
              <div className='lg:flex-1 flex flex-col '>
                <div className='flex-1 flex items-center justify-center '>
                  {
                    file == null ?
                      <p >Please Select a file</p>
                      :
                      <DocumentCard documentName={file.name} />

                  }
                </div>
                <Button variant='secondary' onClick={confirmUpload}>
                  Confirm Upload
                </Button>
              </div>
            </div>
          </div>
        </div>
      </StyledWrapper>
    </div>

  )
}

function DocumentCard({ documentName }) {
  return (
    <div className="flex items-center p-4 border rounded-lg 
      w-full">
      <div className="text-red-500 text-3xl flex-shrink-0">
        <FaFilePdf />
      </div>

      <div className="ml-4">
        <h3 className="text-lg font-medium text-white">{documentName}</h3>
      </div>
    </div>
  );
}
const StyledWrapper = styled.div`
  .package2 {
      width: 75vw;
      height: 80vh;
     border: 2px solid #ff00ff ; 
    background-color:black;
    border-radius: 18px;
    transition: all 0.25s cubic-bezier(0, 0, 0, 1);
    cursor: pointer;
    transform: scale(0.99);
    box-shadow: 0px 0px 30px 1px rgba(204, 0, 255, 0.3);
  }


  .text {
    color: white;
    font-size: 17px;
  }
`;

