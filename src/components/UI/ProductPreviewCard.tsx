import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/UI'
import { Products } from '@/utils/types'
import { useRouter } from 'next/router'

interface ProdPrev extends Products {
  index: number
}

const ProductPreviewCard = (props: ProdPrev) => {
  const { index, image, name, slug, description } = props

  const route = useRouter()

  return (
    <div
      role="listitem"
      className={`preview-card ${
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
        <Button
          label="See Product"
          cb={() => route.push(`/products/${slug}`)}
        />
      </div>
    </div>
  )
}

export default ProductPreviewCard
