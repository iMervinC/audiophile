import { Button } from '@/components/UI'
import { useRouter } from 'next/router'
import React from 'react'
import Image from 'next/image'
import { PageWrap } from '@/components/Wrapper'
import { useGetProduct } from '@/utils/hooks'

const Product = () => {
  const route = useRouter()
  const { product } = route.query
  const { data, isLoading, isError } = useGetProduct(product)

  return (
    <PageWrap title={data ? data!.name : 'Loading...'}>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {data && (
        <div role="listitem" className={`preview-card`}>
          <div className={`w-full bg-grey text-center rounded-lg`}>
            <Image
              src={data.image.desktop}
              height={500}
              width={500}
              alt={data.slug}
              objectFit="fill"
              className="w-44"
            />
          </div>
          <div className="flex flex-col justify-center space-y-9 w-full items-center md:items-start">
            <div>
              {data.new && <p className="overline text-main ">New Product</p>}
              <h2 className="text-4xl">{data.name}</h2>
            </div>
            <p>{data.description}</p>
          </div>
        </div>
      )}
    </PageWrap>
  )
}

export default Product
