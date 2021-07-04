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

const Speakers = ({ initialdata }: { initialdata: Products[] }) => {
  const { data, isError, isLoading } = useGetProductsByCategories(
    'speakers',
    initialdata
  )

  return (
    <PageWrap title="Speakers">
      <CategoryTitle title="Speakers" />
      {isError && <div data-testid="Error">Error</div>}
      {isLoading && <div data-testid="Loading">Error</div>}
      <ProductsPreview data={data!} />
      <Categories />
      <About />
    </PageWrap>
  )
}

export const getStaticProps = async () => {
  const data = await fetchByCategory('speakers')

  return {
    props: {
      initialdata: data,
    },
  }
}

export default Speakers
