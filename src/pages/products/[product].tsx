import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import router, { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'
import { ProductCard } from '@/components/UI'
import { Categories, About } from '@/components/Sections'
import { PageWrap } from '@/components/Wrapper'
import { useGetProduct } from '@/utils/hooks'
import { Products } from '@/utils/types'

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
            <div className="grid grid-cols-[30vw 70vw] grid-rows-2 max-h-[592px] gap-[30px]">
              <div className="col-start-1">
                <Image
                  src={data.gallery.first.desktop}
                  alt="first"
                  height="280"
                  width="445"
                  objectFit="fill"
                  blurDataURL={data.gallery.first.mobile}
                  placeholder="blur"
                  className="rounded-xl"
                />
              </div>
              <div className="col-start-1 row-start-2">
                <Image
                  src={data.gallery.second.desktop}
                  alt="second"
                  height="280"
                  width="445"
                  objectFit="cover"
                  blurDataURL={data.gallery.second.mobile}
                  placeholder="blur"
                  className="rounded-xl"
                />
              </div>
              <div className="col-start-2 row-start-1 row-end-2">
                <Image
                  src={data.gallery.third.desktop}
                  alt="third"
                  height="592"
                  width="635"
                  objectFit="cover"
                  blurDataURL={data.gallery.third.mobile}
                  placeholder="blur"
                  className="rounded-xl"
                />
              </div>
            </div>
            <Categories />
            <About />
          </>
        )}
      </div>
    </PageWrap>
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
