import { render, screen } from '@testing-library/react'
import Headphones from '../headphones'
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

describe('Headphones Page', () => {
  let page

  beforeEach(() => {
    useGetProductsByCategories.mockImplementation(() => ({ data }))
    page = render(<Headphones />)
  })

  test('<Headphones/> Snapshot', () => {
    expect(page.container).toMatchSnapshot()
  })

  test('Heading', () => {
    expect(screen.getByTestId('categoryTitle')).toHaveTextContent('Headphones')
  })

  test('Categories Component', () => {
    expect(screen.getByTestId('Categories')).toBeTruthy()
  })

  test('About Component', () => {
    expect(screen.getByTestId('About')).toBeTruthy()
  })

  test('Products list', () => {
    expect(useGetProductsByCategories).toHaveBeenCalledWith(
      'headphones',
      undefined
    )
    data.forEach((item) => {
      expect(screen.getByText(new RegExp(item.name))).toBeInTheDocument
    })
  })

  test('Products', () => {
    expect(screen.getByTestId('Products list')).toBeTruthy()
  })

  test('Loading', () => {
    useGetProductsByCategories.mockImplementation(() => ({ isLoading: true }))
    render(<Headphones />)

    expect(screen.getByTestId('Loading')).toBeTruthy()
  })

  test('Error', () => {
    useGetProductsByCategories.mockImplementation(() => ({ isError: true }))
    const { getByTestId } = render(<Headphones />)

    expect(getByTestId('Error')).toBeTruthy()
  })
})
