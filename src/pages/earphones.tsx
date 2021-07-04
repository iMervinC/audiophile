import { PageWrap } from '@/components/Wrapper'
import {
  Categories,
  About,
  CategoryTitle,
  ProductsPreview,
} from '@/components/Sections'
import { useGetProductsByCategories } from '@/utils/hooks'
import { fetchByCategory } from '@/utils/helper'
import { Products } from '@/utils/types'

const Earphones = ({ initialdata }: { initialdata: Products[] }) => {
  const { data, isError, isLoading } = useGetProductsByCategories(
    'earphones',
    initialdata
  )

  return (
    <PageWrap title="Earphones">
      <CategoryTitle title="Earphones" />
      {isLoading && <p data-testid="Loading">Loading</p>}
      {isError && <p data-testid="Error">Error</p>}
      <ProductsPreview data-testid="ProductsPreview" data={data!} />
      <Categories />
      <About />
    </PageWrap>
  )
}

export const getStaticProps = async () => {
  const data = await fetchByCategory('earphones')

  return {
    props: {
      initialdata: data,
    },
  }
}

export default Earphones
