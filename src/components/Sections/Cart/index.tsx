import Img from 'next/image'
import { CartCounter, Button } from '@/components/UI'
import { CartProduct } from '@/utils/types'
import { useCartDispatch } from '@/utils/hooks'
import { useEffect, useState } from 'react'

const Cart = ({
  items,
  closeNav,
  scroll,
}: {
  items: CartProduct[]
  closeNav: () => void
  scroll: boolean
}) => {
  const { clearCart } = useCartDispatch()

  return (
    <div
      onClick={closeNav}
      className={`absolute w-screen h-screen left-0 top-[106px] bg-translucent transition-all ease-out duration-500 ${
        scroll ? 'lg:top-[66px]' : 'lg:top-[106px]'
      }`}
    >
      <div className="container">
        <div
          onClick={(e) => e.stopPropagation()}
          className="mx-auto sm:mx-0 sm:ml-auto mt-4 p-8 rounded-xl bg-white left-0 max-w-[360px] w-full"
        >
          {items.length > 0 ? (
            <>
              <h6 className="inline-block">Cart ({items.length})</h6>
              <span
                className="underline text-grey-shop cursor-pointer float-right"
                onClick={clearCart}
              >
                Remove all
              </span>
              <ul className="mt-10 space-y-4">
                {items.map((product, index) => (
                  <CartItems key={product.slug} product={product} />
                ))}
              </ul>
              <div className="mt-10">
                <p className="inline-block uppercase font-extralight text-sm">
                  Total
                </p>
                <p className="inline-block float-right font-bold text-lg">
                  ${' '}
                  {items
                    .map((item) => item.price)
                    .reduce((acc, cur) => acc! + cur!)}
                </p>
              </div>
              <Button label="checkout" width="w-full" className="mt-5" />
            </>
          ) : (
            <span className="uppercase text-lg font-bold text-grey-shop text-center">
              No Items in cart
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

const CartItems = ({ product }: { product: CartProduct }) => {
  const [count, setCount] = useState(product.quantity!)
  const { updateItem } = useCartDispatch()

  useEffect(() => {
    updateItem({ ...product, quantity: count })
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
      <CartCounter count={count} setCount={setCount} className="ml-auto" />
    </li>
  )
}

export default Cart
