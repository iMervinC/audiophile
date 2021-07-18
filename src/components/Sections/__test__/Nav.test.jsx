import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import { Nav } from '../Nav'
import { CartStore, CartDispatch } from '@/utils/hooks'

jest.mock('next/router')

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

const cartRender = (ui, { storeProps, dispatchProps, ...renderOptions }) => {
  return render(
    <CartDispatch.Provider {...dispatchProps}>
      <CartStore.Provider {...storeProps}>{ui}</CartStore.Provider>
    </CartDispatch.Provider>,
    renderOptions
  )
}

describe('Navigation', () => {
  let getByTestId = screen.getByTestId
  let expectedRouterPush

  beforeEach(() => {
    expectedRouterPush = jest.fn()
    useRouter.mockImplementation(() => ({
      route: '/',
      pathname: '/',
      query: '',
      asPath: '',
      push: expectedRouterPush,
    }))
    const storeProps = {
      value: { cart: [] },
    }
    cartRender(<Nav />, { storeProps, dispatchProps })
  })

  it('Background smaller and black on Scroll', () => {
    const wrapper = getByTestId('wrapper')
    const navigation = getByTestId('nav')

    fireEvent.scroll(window, {
      target: { scrollY: 200 },
    })

    expect(wrapper.classList).toContain('bg-black')
    expect(navigation.classList).toContain('lg:py-[20px]')

    fireEvent.scroll(window, {
      target: { scrollY: 0 },
    })

    expect(wrapper.classList).not.toContain('bg-black')
    expect(navigation.classList).toContain('lg:py-[40px]')
  })

  it('Navigation route Home', () => {
    const routeHome = getByTestId('nav-home')
    expect(routeHome.classList).toContain('text-main')
  })

  it('Navigation route speakers', () => {
    const routeSpeakers = getByTestId('nav-speakers')
    fireEvent.click(routeSpeakers)

    expect(routeSpeakers.classList).toContain('text-main')
  })

  it('Navigation route earphones', () => {
    const routeEarphones = getByTestId('nav-earphones')

    userEvent.click(routeEarphones)

    expect(routeEarphones.classList).toContain('text-main')
  })

  it('Navigation route headphones', () => {
    const routeHeadphones = getByTestId('nav-headphones')

    userEvent.click(routeHeadphones)

    expect(routeHeadphones.classList).toContain('text-main')
  })

  it('Logo', () => {
    const logo = screen.getByAltText('logo')
    expect(logo).toBeInTheDocument
    userEvent.click(logo)

    expect(expectedRouterPush).toBeCalledTimes(1)
    expect(expectedRouterPush).toBeCalledWith('/')
  })

  it('Mobile Menu toggle', () => {
    const burger = screen.getByTestId('burger')

    expect(burger).toBeVisible()

    userEvent.click(burger)

    expect(screen.queryByTestId('mobile-nav')).toBeInTheDocument()

    userEvent.click(burger)

    expect(screen.queryByTestId('mobile-nav')).not.toBeInTheDocument()
  })

  it('Toggle Cart', () => {
    expect(screen.queryByTestId('cart-popup')).not.toBeInTheDocument()
    userEvent.click(screen.getByRole('button', { name: 'cart' }))
    expect(screen.queryByTestId('cart-popup')).toBeInTheDocument()
  })

  it('Empty Cart', () => {
    userEvent.click(screen.getByRole('button', { name: 'cart' }))

    expect(screen.queryByTestId('cart-popup')).toHaveTextContent(
      /No Items in cart/i
    )
  })
})

describe('Cart', () => {
  let expectedAddToCart
  let expectedRemoveFromCart
  let expectedClearCart
  let expectedUpdateItem

  beforeEach(() => {
    expectedAddToCart = jest.fn()
    expectedRemoveFromCart = jest.fn()
    expectedClearCart = jest.fn()
    expectedUpdateItem = jest.fn()

    cartRender(<Nav />, {
      storeProps,
      dispatchProps: {
        value: {
          addToCart: expectedAddToCart,
          removeFromCart: expectedRemoveFromCart,
          clearCart: expectedClearCart,
          updateItem: expectedUpdateItem,
        },
      },
    })

    userEvent.click(screen.getByRole('button', { name: 'cart' }))
  })

  it('Items in Cart', () => {
    expect(screen.getByTitle('cart-counter')).toHaveTextContent('1')

    expect(screen.getByRole('heading', { level: 6 })).toHaveTextContent(
      'Cart (1)'
    )
  })

  it('Clear Cart', () => {
    userEvent.click(screen.getByText(/remove all/i))

    expect(expectedClearCart).toBeCalledTimes(1)
  })

  it('Change Quantity to Item', () => {
    const cartItem = storeProps.value.cart[0]
    const minusBtn = screen.getByTitle(`${cartItem.slug} -`)
    const plusBtn = screen.getByTitle(`${cartItem.slug} +`)
    const count = screen.getByTitle(`${cartItem.slug} quantity`)

    expect(expectedUpdateItem).toBeCalledTimes(1)
    expect(count).toHaveTextContent('1')
    userEvent.click(plusBtn)
    userEvent.click(plusBtn)
    expect(count).toHaveTextContent('3')
    expect(expectedUpdateItem).toBeCalledTimes(3)
    expect(expectedUpdateItem).toBeCalledWith({ ...cartItem, quantity: 3 })
    userEvent.click(minusBtn)
    expect(count).toHaveTextContent('2')
    expect(expectedUpdateItem).toBeCalledTimes(4)
    expect(expectedUpdateItem).toBeCalledWith({ ...cartItem, quantity: 2 })
    //Remove Item
    userEvent.click(minusBtn)
    userEvent.click(minusBtn)
    expect(expectedRemoveFromCart).toBeCalledTimes(1)
    expect(expectedRemoveFromCart).toBeCalledWith(cartItem.slug)
  })
})
