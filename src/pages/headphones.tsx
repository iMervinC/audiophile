import { PageWrap } from '@/components/Wrapper'
import {
  Categories,
  About,
  CategoryTitle,
  ProductsPreview,
} from '@/components/Sections'

import { useGetProductsByCategories } from '@/utils/hooks'

const Headphones = () => {
  const { data, isError, isLoading } = useGetProductsByCategories('headphones')

  return (
    <PageWrap title="Headphones">
      <CategoryTitle title="Headphones" />
      {isError && <div data-testid="Error">Error</div>}
      {isLoading && <div data-testid="Loading">Error</div>}
      <ProductsPreview data={data!} />
      <Categories />
      <About />
    </PageWrap>
  )
}

export default Headphones
