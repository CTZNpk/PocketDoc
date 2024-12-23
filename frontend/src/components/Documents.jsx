import React from 'react'
import PdfViewer from './DocumentViewer'

export default function Documents() {
  return (
    <div className='bg-black text-white min-h-screen'>
      <div className='flex items-center justify-center '>
        <div className='w-[80vw]'>
          <PdfViewer />

        </div>

      </div>

    </div>
  )
}

