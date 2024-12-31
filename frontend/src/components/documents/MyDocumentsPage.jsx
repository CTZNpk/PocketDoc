import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AnimateBox from "../shared/AnimateBox";
import Button from "../shared/Button";
import DocumentUploadPage from "./DocumentUploadPage";
import docsStore from "../../store/docsStore";
import useDocs from "../../hooks/useDocs";
import { useNavigate } from "react-router";


export default function MyDocumentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { docs } = docsStore();
  const { getMyDocs } = useDocs();

  useEffect(() => {
    getMyDocs();
  }, [getMyDocs]);

  return (
    <div className="bg-black text-white min-h-screen ">
      <AnimateBox className="flex flex-col items-center">
        <div className="flex flex-col mt-[15vh] items-center justify-center">
          <h1 className=" text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold 
              text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 min-h-[70px]
          lg:min-h-[100px] ">
            My Documents
          </h1>
          <Button variant="secondary" onClick={() => setIsModalOpen(true)} wFull={false}>
            Upload Document
          </Button>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 mt-10">
          {docs.map((doc) => (
            <DocumentPreview doc={doc} />
          ))}
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="relative z-10">
              <DocumentUploadPage onClose={() => setIsModalOpen(false)} />
            </div>
          </div>
        )}
      </AnimateBox >
    </div >
  );
}

function DocumentPreview({ doc }) {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/document/${doc.id}/toc`);
  };

  const stopAtHalf = () => {
    const video = videoRef.current;
    if (video) {
      if (video.currentTime >= video.duration / 2) {
        video.pause();
        video.removeEventListener("timeupdate", stopAtHalf);
      }

    }
  };
  const handleMouseEnter = () => {
    const video = videoRef.current;
    video.currentTime = 0;
    video.play();
    video.addEventListener("timeupdate", stopAtHalf);
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = video.duration - video.currentTime
    video.removeEventListener("timeupdate", stopAtHalf);
    video.play();
  };

  return (
    <div className="flex flex-col items-center justify-center m-5"
      onClick={handleClick}

    >
      <StyledWrapper>
        <div className="package">
          <div
            className="package2 relative w-64 h-40 rounded-lg overflow-hidden bg-gray-200 shadow-lg hover:shadow-xl transition-shadow"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <video
              ref={videoRef}
              muted
              className="w-full h-full object-cover"
            >
              <source src="/book_open.mp4" type="video/mp4" />
              Your browser does not support video.
            </video>

          </div>

        </div>
      </StyledWrapper>
      <h2 className="text-l sm:text-xl mt-2 lg:mt-3 text-center">
        {doc.title}
      </h2>

    </div>);
}


const StyledWrapper = styled.div`
  .package {
    width: 300px;
    height: 254px;
    background-image: linear-gradient(163deg, #ff00ff 0%, #3700ff 100%);
    border-radius: 20px;
    text-align: center;
    transition: all 0.25s cubic-bezier(0, 0, 0, 1);
  }

  .package:hover {
    box-shadow: 0px 0px 30px 1px rgba(204, 0, 255, 0.3);
  }

  .package2 {
    width: 300px;
    height: 254px;
    background-color: #1d1724;
    border-radius: 10px;
    transition: all 0.25s cubic-bezier(0, 0, 0, 1);
    cursor: pointer;
  }

  .package2:hover {
    transform: scale(0.98);
    border-radius: 18px;
  }

  .text {
    color: white;
    font-size: 17px;
  }`;
