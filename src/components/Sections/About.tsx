import React from 'react'

const About = () => {
  return (
    <div
      data-testid="About"
      className="flex flex-col-reverse container px-9 my-60 space-y-10 max-w-[1150px] gap-[50px] h-auto lg:flex-row lg:space-x-10 md:space-y-0 lg:h-[588px] lg:px-0 "
    >
      <div className="flex flex-col text-center lg:text-left lg:justify-center h-full md:w-full">
        <h3 className="title text-4xl mb-10">
          Bringing you the <span className="text-main">best</span> audio gear
        </h3>
        <p>
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
      <div className="bg-about-mobile sm:bg-about-tablet lg:bg-about bg-no-repeat bg-cover bg-center h-[300px] w-full rounded-xl lg:h-auto" />
    </div>
  )
}

export { About }
