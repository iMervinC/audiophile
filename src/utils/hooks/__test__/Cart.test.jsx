import { renderHook, act } from '@testing-library/react-hooks'
import { CartProvider, CartStore, useCartDispatch, useCartStore } from '../Cart'

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>

describe('Cart Store', () => {
  test('Store', () => {
    const store = renderHook(() => useCartStore(), { wrapper })
    const dispatch = renderHook(() => useCartDispatch(), { wrapper })

    act(() => {
      dispatch.result.current.addToCart({
        image: {
          desktop: '/assets/product-zx9-speaker/desktop/image-product.jpg',
          mobile: '/assets/product-zx9-speaker/mobile/image-product.jpg',
          tablet: '/assets/product-zx9-speaker/tablet/image-product.jpg',
        },

        name: 'ZX9 Speaker',
        price: 4500,
        quantity: 1,
        slug: 'zx9-speaker',
      })
    })

    expect(store.result.current.cart).toBe(1)
  })
})
