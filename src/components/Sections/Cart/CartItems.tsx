import Img from 'next/image'
import { CartCounter } from '@/components/UI'
import { CartProduct } from '@/utils/types'
import { useCartDispatch } from '@/utils/hooks'
import { useEffect, useState } from 'react'

export const CartItems = ({ product }: { product: CartProduct }) => {
  const [count, setCount] = useState(product.quantity!)
  const { updateItem, removeFromCart } = useCartDispatch()

  useEffect(() => {
    if (count > 0) {
      updateItem({ ...product, quantity: count })
    } else {
      removeFromCart(product.slug!)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  return (
    <li className="flex items-center">
      <Img
        src={product.image!.mobile}
        alt={product.slug}
        height={64}
        width={64}
        className="rounded-lg"
      />
      <div className="flex flex-col space-y-1 ml-2">
        <span className="font-bold text-base uppercase">{product.name}</span>
        <span className="font-bold text-sm text-grey-shop">
          $ {product.price! * product.quantity!}
        </span>
      </div>
      <CartCounter
        count={count}
        setCount={setCount}
        className="ml-auto"
        title={product.slug}
      />
    </li>
  )
}
