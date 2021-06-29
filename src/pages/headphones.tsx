import { PageWrap } from '@/components/Wrapper'
import { Categories, About, CategoryTitle } from '@/components/Sections'
import { useGetProductsByCategories } from '@/utils/hooks'

const Headphones = () => {
  const { data } = useGetProductsByCategories('headphones')

  return (
    <PageWrap title="Headphones">
      <CategoryTitle title="Headphones" />
      <Categories />
      <About />
    </PageWrap>
  )
}

export default Headphones
