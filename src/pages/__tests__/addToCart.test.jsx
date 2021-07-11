import { useRouter } from 'next/router'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Providers } from '@/components/Wrapper'
import Product from '@/pages/products/[product]'
import { Nav } from '@/components/Sections'
import { data } from '@/utils/testData'
import { useGetScroll } from '@/utils/hooks/GetScroll'

jest.mock('next/router')
jest.mock('@/utils/hooks/GetScroll')

describe('Adding items to cart', () => {
  beforeEach(() => {
    useGetScroll.mockImplementation(() => ({ scrollY: 0 }))
    useRouter.mockImplementation(() => ({
      query: 'yx1-earphones',
      route: '/',
      pathname: '/',
      query: '',
    }))

    render(
      <Providers>
        <Nav />
        <Product initialData={data} />
      </Providers>
    )
  })

  test('Add to cart', () => {
    const addToCartBtn = screen.getByRole('button', {
      name: /Buttonadd-to-cart/i,
    })
    const cartCounter = screen.queryByTitle('cart-counter')
    userEvent.click(addToCartBtn)
    expect(cartCounter).toHaveTextContent('1')
  })

  test('Changing quatity', () => {
    const add = screen.getByRole('button', { name: '+' })
    const subtract = screen.getByRole('button', { name: '-' })
    const quantity = screen.getByTitle('quantity')
    const addToCartBtn = screen.getByRole('button', {
      name: /Buttonadd-to-cart/i,
    })
    userEvent.click(add)
    userEvent.click(add)
    userEvent.click(add)
    expect(quantity).toHaveTextContent('4')
  })
})
