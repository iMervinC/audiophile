/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@/components/UI'
import { CartProduct } from '@/utils/types'
import { useCartDispatch } from '@/utils/hooks'
import { useRouter } from 'next/router'
import { totalCost } from '@/utils/helper'
import { CartItems } from './CartItems'

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
  const route = useRouter()
  return (
    <div
      onClick={closeNav}
      className={`cart ${scroll ? 'lg:top-[66px]' : 'lg:top-[106px]'}`}
      data-testid="cart-popup"
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
                  $ {totalCost(items)}
                </p>
              </div>
              <Button
                label="checkout"
                width="w-full"
                className="mt-5"
                cb={() => {
                  closeNav()
                  route.push('/checkout')
                }}
              />
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
export default Cart
