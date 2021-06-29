import { PageWrap } from '@/components/Wrapper'
import { Categories, About, CategoryTitle } from '@/components/Sections'

const headphones = () => {
  return (
    <PageWrap title="Headphones">
      <CategoryTitle title="Headphones" />
      <Categories />
      <About />
    </PageWrap>
  )
}

export default headphones
