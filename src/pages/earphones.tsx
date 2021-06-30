import { PageWrap } from '@/components/Wrapper'
import { Categories, About, CategoryTitle } from '@/components/Sections'
import { useGetProductsByCategories } from '@/utils/hooks'

const Earphones = () => {
  const { data } = useGetProductsByCategories('earphones')

  return (
    <PageWrap title="Earphones">
      <CategoryTitle title="Earphones" />
      <Categories />
      <About />
    </PageWrap>
  )
}

export default Earphones
