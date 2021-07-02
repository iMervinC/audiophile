import { ProductPreviewCard } from '@/components/UI'
import { Products } from '@/utils/types'

const ProductsPreview = ({ data }: { data: Products[] }) => {
  const sortByNew = (a: Products, b: Products) => {
    return a.new === b.new ? 0 : a.new ? -1 : 1
  }

  return (
    <div data-testid="Products list" className="space-y-20 my-28">
      {data?.sort(sortByNew).map((product, index) => (
        <ProductPreviewCard
          {...product}
          key={product.id}
          data-testid={product.slug}
          index={index}
        />
      ))}
    </div>
  )
}

export default ProductsPreview
