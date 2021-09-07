import { ProductPreviewCard } from '@/components/UI'
import { Products } from '@/utils/types'

const ProductsPreview = ({ data }: { data: Products[] | undefined }) => {
  return (
    <ul
      data-testid="Products list"
      className="space-y-20 my-28 max-w-[1150px] container"
    >
      {data?.map((product, index) => (
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
