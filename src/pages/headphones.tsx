import { useEffect } from 'react'
import { PageWrap } from '@/components/Wrapper'
import {
  Categories,
  About,
  CategoryTitle,
  ProductsPreview,
} from '@/components/Sections'
import { useGetProductsByCategoriesQuery } from '@/features/store/storeApiSlice'
import { fetchByCategory } from '@/utils/helper'
import { Products } from '@/utils/types'
import { usePrefetchImmediately } from '@/utils/hooks'

const Headphones = ({ initialdata }: { initialdata: Products[] }) => {

  const { data, isError, isLoading } =
    useGetProductsByCategoriesQuery('headphones')

  useEffect(() => {}, [])

  return (
    <PageWrap title="Headphones">
      <CategoryTitle title="Headphones" />
      {isError && <div data-testid="Error">Error</div>}
      {isLoading && <div data-testid="Loading">Error</div>}
      <ProductsPreview data={data} />
      <Categories />
      <About />
    </PageWrap>
  )
}

export const getStaticProps = async () => {
  const data = await fetchByCategory('headphones')

  return {
    props: {
      initialdata: data,
    },
  }
}

export default Headphones
