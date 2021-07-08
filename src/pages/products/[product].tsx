import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Button, ProductCard } from '@/components/UI'
import { Categories, About, Gallery } from '@/components/Sections'
import { PageWrap } from '@/components/Wrapper'
import { useGetProduct } from '@/utils/hooks'
import { Products } from '@/utils/types'
import { route } from 'next/dist/next-server/server/router'

const Product = ({ initialData }: { initialData: Products }) => {
  const route = useRouter()
  const { product } = route.query
  const { data, isLoading, isError } = useGetProduct(product, initialData)
  const [quantity, setQuantity] = useState(0)

  return (
    <PageWrap title={data ? data!.name : 'Loading...'}>
      <div className="container max-w-[1150px] pt-44">
        <div
          className="cursor-pointer px-9 lg:px-0 hover:text-main "
          onClick={() => route.back()}
        >
          Go Back
        </div>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error</div>}
        {data && (
          <>
            <ProductCard
              data={data}
              quantity={Math.max(0, quantity)}
              setQuantity={setQuantity}
            />
            <div className="flex flex-col lg:flex-row contain-padding mt-28 space-y-20 lg:space-y-0">
              <div className="lg:w-[50rem] space-y-5">
                <h2 className="text-xl sm:text-3xl md:text-4xl">Features</h2>
                <p>{data.features}</p>
              </div>

              <div className="flex flex-col space-y-5 sm:flex-row lg:flex-col lg:mx-auto  sm:space-y-0">
                <h2 className="w-full text-xl sm:text-3xl md:text-4xl">
                  In the box
                </h2>
                <ul className="w-full space-y-2">
                  {data.includes.map((item) => (
                    <li key={item.item} className="text-grey-shop">
                      <span className="text-main font-bold mr-10">
                        {item.quantity}x
                      </span>
                      {item.item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Gallery gallery={data.gallery} />
            <Upsell upsells={data.others} />
            <Categories />
            <About />
          </>
        )}
      </div>
    </PageWrap>
  )
}

const Upsell = ({ upsells }: { upsells: Products['others'] }) => {
  const route = useRouter()

  return (
    <div className="contain-padding mt-16 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl md:text-left">
        You may also like
      </h2>
      <ul className="flex flex-col md:flex-row md:justify-between mt-10 space-y-10 md:space-y-0">
        {upsells.map((item) => (
          <li key={item.slug} className="space-y-5">
            <Image
              src={item.image.desktop}
              alt={item.slug}
              width="330"
              height="300"
              objectFit="fill"
            />
            <h4 className="text-2xl sm:text-3xl">{item.name}</h4>
            <Button
              label="See Product"
              title={item.slug}
              cb={() => route.push(`/products/${item.slug}`)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const { data } = await axios.get<Products[]>(
    'http://localhost:3000/api/products'
  )

  // Get the paths we want to pre-render based on posts
  const paths = data.map((product) => ({
    params: { product: product.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Call an external API endpoint to get posts
  const { data } = await axios.get<Products>(
    `http://localhost:3000/api/products/item/${params}`
  )

  return {
    props: {
      initialData: data,
    },
  }
}

export default Product
