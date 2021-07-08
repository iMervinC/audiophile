import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/UI'
import { useRouter } from 'next/router'

const ProductHighlight = () => {
  const route = useRouter()

  return (
    <div
      data-testid="Product Highlight"
      className="grid container px-8 lg:px-0 max-w-[1150px] gap-[50px] mt-40"
    >
      <div className="flex flex-col items-center justify-evenly bg-main text-center py-12 rounded-xl bg-no-repeat bg-circle-mobile lg:flex-row lg:pb-0  sm:bg-circle-tablet lg:bg-circle">
        <div className="mx-auto w-[160px] h-[200px] lg:mx-0 lg:w-[410px] lg:h-auto ">
          <Image
            src="/home/desktop/image-speaker-zx9.png"
            height={493}
            width={410}
            alt="zx9"
            objectFit="contain"
          />
        </div>
        <div className="space-y-7 mx-9 mt-7 sm:mx-40 lg:m-0 lg:w-[349px] lg:text-left">
          <h3 className="text-4xl lg:title  text-white">ZX9 SPEAKER</h3>
          <p className="text-white font-extralight">
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </p>
          <Button
            variant="bnw"
            label="See Product"
            title="zx9"
            cb={() => route.push('/products/zx9-speaker')}
          />
        </div>
      </div>
      <div className="bg-speaker-mobile bg-no-repeat bg-cover sm:bg-speaker-tablet lg:bg-speaker  space-y-7 px-9 py-32 rounded-xl lg:px-36 lg:py-20">
        <h4 className="text-4xl">ZX7 SPEAKER</h4>
        <Button
          variant="wnb"
          label="See Product"
          title="zx7"
          cb={() => route.push('/products/zx7-speaker')}
        />
      </div>

      <div className="flex flex-col md:flex-row space-y-10 md:space-x-10 md:space-y-0 h-[424px] lg:h-[320px]">
        <div className="bg-earphone-mobile bg-no-repeat bg-cover rounded-xl h-full md:w-full sm:bg-earphone-tablet md:bg-earphone bg-center" />
        <div className="flex justify-center bg-grey flex-col h-full md:w-full rounded-xl space-y-7 px-9">
          <h4 className="text-4xl">YX1 EARPHONES</h4>
          <Button
            variant="wnb"
            label="See Product"
            title="yx1"
            cb={() => route.push('/products/yx1-earphones')}
          />
        </div>
      </div>
    </div>
  )
}

export { ProductHighlight }
