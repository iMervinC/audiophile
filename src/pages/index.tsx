import { PageWrap } from '@/components/Wrapper'
import {
  Hero,
  Categories,
  ProductHighlight,
  About,
} from '@/components/Sections'

export default function Home() {
  return (
    <PageWrap title="Home">
      <Hero />
      <Categories />
      <ProductHighlight />
      <About />
    </PageWrap>
  )
}
