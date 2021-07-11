import Product from '../products/[product]'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import { useGetProduct, useCartDispatch } from '@/utils/hooks'
import { data } from '@/utils/testData'

jest.mock('next/router')
jest.mock('@/utils/hooks')

describe('Product Page', () => {
  let expectedRouterBack
  let expectedRouterPush
  let expectedAddToCart

  beforeEach(() => {
    expectedRouterBack = jest.fn()
    expectedRouterPush = jest.fn()
    expectedAddToCart = jest.fn()

    useRouter.mockImplementation(() => ({
      back: expectedRouterBack,
      push: expectedRouterPush,
      query: 'yx1-earphones',
    }))
    useGetProduct.mockImplementation(() => ({ data }))
    useCartDispatch.mockImplementation(() => ({
      addToCart: expectedAddToCart,
    }))

    render(<Product initialData={data} />)
  })

  it('Back Button', () => {
    const backBtn = screen.getByText(/go back/i)
    expect(backBtn).toBeInTheDocument()
    userEvent.click(backBtn)
    expect(expectedRouterBack).toBeCalledTimes(1)
  })

  it('With Error', () => {
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()

    useGetProduct.mockImplementation(() => ({ isError: true }))
    render(<Product initialData={data} />)

    expect(screen.getByText(/error/i)).toBeInTheDocument()
  })

  it('When Loading', () => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()

    useGetProduct.mockImplementation(() => ({ isLoading: true }))
    render(<Product initialData={data} />)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  describe('Component renders', () => {
    it('Check Product Preview', () => {
      expect(screen.getByTestId('Product Card')).toBeInTheDocument()
    })

    it('Check Product Features & Includes', () => {
      expect(screen.getByText(data.name)).toBeInTheDocument()

      data.includes.forEach((item) => {
        expect(screen.getByText(item.item)).toBeInTheDocument()
      })
    })

    it('Check Product Galery', () => {
      Object.keys(data.gallery).forEach((key) => {
        expect(screen.getByAltText(key)).toBeInTheDocument()
      })
    })

    it('Check Product Upsells', () => {
      expect(screen.getByText(/you may also like/i)).toBeInTheDocument()

      data.others.forEach((item) => {
        expect(screen.getByText(item.name)).toBeInTheDocument()

        let btn = screen.getByTitle(`Button${item.slug}`)
        expect(btn).toBeInTheDocument()
        userEvent.click(btn)

        // expect(expectedRouterPush).toBeCalledTimes(1)
        expect(expectedRouterPush).toBeCalledWith(`/products/${item.slug}`)
      })
    })

    test('Check Categories Component', () => {
      expect(screen.getByTestId('Categories')).toBeInTheDocument()
    })

    test('Check About Component', () => {
      expect(screen.getByTestId('About')).toBeInTheDocument()
    })
  })

  test('Add to cart', () => {
    const addToCartBtn = screen.getByRole('button', {
      name: /Buttonadd-to-cart/i,
    })
    userEvent.click(addToCartBtn)

    expect(expectedAddToCart).toBeCalledTimes(1)
    expect(expectedAddToCart).toBeCalledWith({
      name: data.name,
      price: data.price,
      quantity: 1,
      slug: data.slug,
    })
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

    userEvent.click(addToCartBtn)

    expect(expectedAddToCart).toBeCalledTimes(1)
    expect(expectedAddToCart).toBeCalledWith({
      name: data.name,
      price: data.price,
      quantity: 4,
      slug: data.slug,
    })
  })
})
