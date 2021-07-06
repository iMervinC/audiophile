import Product from '../products/[product]'
import { getByText, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import { useGetProduct } from '@/utils/hooks'

const data = {
  slug: 'yx1-earphones',
  name: 'YX1 Wireless Earphones',
  image: {
    desktop: '/home/desktop/image-earphones-yx1.jpg',
  },
  new: true,
  price: 599,
  description:
    'Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.',
  features:
    'Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit, delivering complete comfort all day long while enjoying exceptional noise isolation and truly immersive sound.\n\nThe YX1 Wireless Earphones features customizable controls for volume, music, calls, and voice assistants built into both earbuds. The new 7-hour battery life can be extended up to 28 hours with the charging case, giving you uninterrupted play time. Exquisite craftsmanship with a splash resistant design now available in an all new white and grey color scheme as well as the popular classic black.',
}

jest.mock('next/router')
jest.mock('@/utils/hooks', () => ({
  useGetProduct: jest.fn(),
}))

describe('Product Page', () => {
  let expectedRouterBack

  beforeEach(() => {
    expectedRouterBack = jest.fn()
    useRouter.mockImplementation(() => ({
      back: expectedRouterBack,
      query: 'yx1-earphones',
    }))
    useGetProduct.mockImplementation(() => ({ data }))
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
})
