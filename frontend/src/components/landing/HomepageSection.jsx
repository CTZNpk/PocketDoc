import React from 'react'
import Title from '../shared/Title'
import ShadowDiv from '../shared/ShadowDiv'
import Button from '../shared/Button'
import AnimateBox from '../shared/AnimateBox'

export default function HomepageSection({ topText, title, subHeading, text, buttonText, visual }) {
  return (
    <section className="min-h-[70vh] py-12 sm:pb-16 lg:pb-20 xl:pb-24">
      <AnimateBox className=''>
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="relative flex flex-col-reverse lg:flex-row items-center lg:justify-between">
            <div className="lg:w-2/3 flex flex-col items-center text-center lg:items-start lg:text-left">
              {
                topText != "" &&
                <p className="text-sm font-normal tracking-widest text-gray-300 uppercase">
                  {topText}
                </p>
              }
              <Title >
                {title}
              </Title>
              <h2 className="text-xl sm:text-2xl mt-2 lg:mt-3">
                {subHeading}
              </h2>
              <p className="max-w-lg mt-4 text-base sm:text-lg md:text-xl font-normal text-gray-400">
                {text}
              </p>
              <ShadowDiv >
                <Button variant='primary'>
                  {buttonText}
                </Button>
              </ShadowDiv>
            </div>
            <div className="-mt-4 mb-8 lg:mt-0 lg:ml-8">
              {visual}
            </div>
          </div>
        </div>
      </AnimateBox>
    </section>
  )
}

