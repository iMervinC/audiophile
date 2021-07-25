import { render, RenderOptions, screen } from '@testing-library/react'
import { FC, ReactElement } from 'react'
import { CartStore, CartDispatch, CartProvider } from '@/utils/hooks'

const AllProviders: FC = ({ children }) => {
  const storeProps = {
    value: {
      cart: [
        {
          image: {
            desktop: '/assets/product-zx9-speaker/desktop/image-product.jpg',
            mobile: '/assets/product-zx9-speaker/mobile/image-product.jpg',
            tablet: '/assets/product-zx9-speaker/tablet/image-product.jpg',
          },

          name: 'ZX9 Speaker',
          price: 4500,
          quantity: 1,
          slug: 'zx9-speaker',
        },
      ],
    },
  }

  const dispatchProps = {
    value: {
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      clearCart: jest.fn(),
      updateItem: jest.fn(),
    },
  }

  return (
    <CartDispatch.Provider {...dispatchProps}>
      <CartStore.Provider {...storeProps}>{children}</CartStore.Provider>
    </CartDispatch.Provider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
