import React, { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import { Button, Counter } from '@/components/UI'
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

export const ProductCard = ({
  data,
  quantity,
  setQuantity,
}: {
  data: Products
  quantity: number
  setQuantity: Dispatch<SetStateAction<number>>
}) => {
  return (
    <div
      role="listitem"
      className={`preview-card-page flex-col mt-8 md:mt-16 sm:flex-row`}
    >
      <div
        className={`flex items-center justify-center w-full bg-grey text-center rounded-lg`}
      >
        <Image
          src={data.image.desktop}
          height={500}
          width={500}
          alt={data.slug}
          objectFit="fill"
          className="w-44"
        />
      </div>
      <div className="flex flex-col justify-center space-y-9 w-full items-center sm:items-start">
        <div>
          {data.new && <p className="overline text-main ">New Product</p>}
          <h1 className="text-4xl">{data.name}</h1>
        </div>
        <p>{data.description}</p>
        <span className="font-bold">{'$ ' + data.price}</span>
        <div className="flex space-x-5">
          <Counter count={quantity} setCount={setQuantity} />
          <Button label="Add To Cart" />
        </div>
      </div>
    </div>
  )
}

export default ProductPreviewCard
