import { PageWrap } from '@/components/Wrapper'
import { Hero, Categories, ProductPreview, About } from '@/components/Sections'

export default function Home() {
  return (
    <PageWrap title="Home">
      <Hero />
      <Categories />
      <ProductPreview />
      <About />
    </PageWrap>
  )
}
