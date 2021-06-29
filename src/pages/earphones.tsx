import { PageWrap } from '@/components/Wrapper'
import { Categories, About, CategoryTitle } from '@/components/Sections'

const earphones = () => {
  return (
    <PageWrap title="Earphones">
      <CategoryTitle title="Earphones" />
      <Categories />
      <About />
    </PageWrap>
  )
}

export default earphones
