import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/UI'
import { Products } from '@/utils/types'

interface ProdPrev extends Products {
  index: number
}

const ProductPreviewCard = (props: ProdPrev) => {
  const { index, image, name, slug, description } = props
  return (
    <div
      className={`flex flex-col  container max-w-[1150px] px-9 lg:px-0 space-x-0 md:space-x-5 space-y-5 md:space-y-0 text-center md:text-left ${
        index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      <div
        className={`w-full bg-grey text-center rounded-lg ${
          index % 2 !== 0 ? 'md:ml-20' : 'md:mr-20'
        }`}
      >
        <Image
          src={image.desktop}
          height={500}
          width={500}
          alt={slug}
          objectFit="fill"
          className="w-44"
        />
      </div>
      <div className="flex flex-col justify-center space-y-9 w-full items-center md:items-start">
        <div>
          {props.new && <p className="overline text-main ">New Product</p>}
          <h2 className="text-4xl">{name}</h2>
        </div>
        <p>{description}</p>
        <Button label="See Product" />
      </div>
    </div>
  )
}

export default ProductPreviewCard
