import { PageWrap } from '@/components/Wrapper'
import { Categories, About, CategoryTitle } from '@/components/Sections'
import { useGetProductsByCategories } from '@/utils/hooks'

const Headphones = () => {
  const { data, isError, isLoading } = useGetProductsByCategories('headphones')

  return (
    <PageWrap title="Headphones">
      <CategoryTitle title="Headphones" />
      {data?.map((product) => (
        <div key={product.id} data-testid={product.slug}>
          <p>{product.name}</p>
        </div>
      ))}
      <Categories />
      <About />
    </PageWrap>
  )
}

export default Headphones
