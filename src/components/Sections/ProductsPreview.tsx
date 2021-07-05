import { ProductPreviewCard } from '@/components/UI'
import { Products } from '@/utils/types'

const ProductsPreview = ({ data }: { data: Products[] }) => {
  const sortByNew = (a: Products, b: Products) => {
    return a.new === b.new ? 0 : a.new ? -1 : 1
  }

  return (
    <ul
      data-testid="Products list"
      className="space-y-20 my-28 max-w-[1150px] container"
    >
      {data?.sort(sortByNew).map((product, index) => (
        <ProductPreviewCard
          key={product.id}
          {...product}
          data-testid={product.slug}
          index={index}
        />
      ))}
    </ul>
  )
}

export default ProductsPreview
