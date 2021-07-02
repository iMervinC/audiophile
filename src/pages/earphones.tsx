import { PageWrap } from '@/components/Wrapper'
import { Categories, About, CategoryTitle } from '@/components/Sections'
import { useGetProductsByCategories } from '@/utils/hooks'

const Earphones = () => {
  const { data, isError, isLoading } = useGetProductsByCategories('earphones')

  return (
    <PageWrap title="Earphones">
      <CategoryTitle title="Earphones" />
      <Categories />
      {isLoading && <p data-testid="Loading">Loading</p>}
      {isError && <p data-testid="Error">Error</p>}
      <div className="bg-main" data-testid="products">
        {data?.map((product) => (
          <div key={product.id} data-testid={`${product.slug}`}>
            <h2>{product.name}</h2>
          </div>
        ))}
      </div>
      <About />
    </PageWrap>
  )
}

export default Earphones
