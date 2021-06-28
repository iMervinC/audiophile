import { PageWrap } from '@/components/Wrapper'
import { Hero, Categories, ProductPreview } from '@/components/Sections'

export default function Home() {
  return (
    <PageWrap title="Home">
      <Hero />
      <Categories />
      <ProductPreview />
    </PageWrap>
  )
}
