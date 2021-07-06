import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import router, { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'
import { ProductCard } from '@/components/UI'
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
            <div className="">
              <h2>Features</h2>
              <p>{data.features}</p>
            </div>
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
