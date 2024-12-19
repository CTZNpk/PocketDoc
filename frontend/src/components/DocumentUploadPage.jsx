import React from 'react'
import styled from 'styled-components';

export default function DocumentUploadPage() {
  return (
    <div className="flex justify-center items-center text-white h-[100vh] w-full bg-black">
      <StyledWrapper >
        <div
          className="flex flex-col package2 relative rounded-lg overflow-hidden bg-gray-200 
            shadow-lg hover:shadow-xl transition-shadow justify-center items-center p-4">

          <h1 className="mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Upload Document
          </h1>
          <div className='flex flex-col lg:flex-row gap-6 w-full mt-6 p-8 h-full'>
            <div className="lg:flex-1 h-full w-full flex items-center 
                justify-center border-2 rounded-lg text-gray-700"
              style={{ borderColor: '#634685', color: '#634685' }}
            >
              Select Document
            </div>
            <div className='lg:flex-1 flex flex-col '>
              <div className='flex-1 flex items-center justify-center '>
                Documents uploaded

              </div>
              <button
                className="m-10 p-8 flex items-center justify-center 
                  bg-purple-800 text-white rounded-xl py-2 px-4"
              >
                Confirm Upload
              </button>
            </div>
          </div>
        </div>

      </StyledWrapper>

    </div >

  )
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
  }


  .text {
    color: white;
    font-size: 17px;
  }
`;

