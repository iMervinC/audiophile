import { PageWrap } from '@/components/Wrapper'
import { Categories, About, CategoryTitle } from '@/components/Sections'

const speakers = () => {
  return (
    <PageWrap title="Speakers">
      <CategoryTitle title="Speakers" />
      <Categories />
      <About />
    </PageWrap>
  )
}

export default speakers
