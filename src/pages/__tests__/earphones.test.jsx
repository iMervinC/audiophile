import { render, screen } from '@testing-library/react'
import Earphones from '../earphones'
import { useGetProductsByCategories } from '@/utils/hooks'

const data = [
  {
    id: 1,
    slug: 'xx59-headphones',
    name: 'XX59 Headphones',
    category: 'headphones',
    new: true,
    image: {
      desktop: '/home/desktop/image-earphones-yx1.jpg',
    },
  },
  {
    id: 2,
    slug: 'asd-headphones',
    name: 'asd Headphones',
    category: 'headphones',
    new: false,
    image: {
      desktop: '/home/desktop/image-earphones-yx1.jpg',
    },
  },
]

jest.mock('@/utils/hooks', () => ({
  useGetProductsByCategories: jest.fn(),
}))

describe('Earphones', () => {
  let page
  beforeEach(() => {
    useGetProductsByCategories.mockImplementation(() => ({ data }))
    page = render(<Earphones />)
  })

  test('Products list', () => {
    expect(useGetProductsByCategories).toHaveBeenCalledWith(
      'earphones',
      undefined
    )
    data.forEach((item) => {
      expect(screen.getByText(new RegExp(item.name))).toBeInTheDocument
    })
  })

  test('<Earphones/> Snapshot', () => {
    expect(page.container).toMatchSnapshot()
  })

  test('Heading', () => {
    expect(screen.getByTestId('categoryTitle')).toHaveTextContent('Earphones')
  })

  test('Categories Component', () => {
    expect(screen.getByTestId('Categories')).toBeTruthy()
  })

  test('About Component', () => {
    expect(screen.getByTestId('About')).toBeTruthy()
  })

  test('Loading', () => {
    useGetProductsByCategories.mockImplementation(() => ({ isLoading: true }))
    render(<Earphones />)

    expect(screen.getByTestId('Loading')).toBeTruthy()
  })

  test('Error', () => {
    useGetProductsByCategories.mockImplementation(() => ({ isError: true }))
    render(<Earphones />)

    expect(screen.getByTestId('Error')).toBeTruthy()
  })
})
