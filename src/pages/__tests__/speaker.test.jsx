import { render, screen } from '@testing-library/react'
import Speakers from '../speakers'
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

describe('Earphone', () => {
  let page

  beforeEach(() => {
    useGetProductsByCategories.mockImplementation(() => ({ data }))
    page = render(<Speakers />)
  })

  test('<Earphone/> Snapshot', () => {
    expect(page.container).toMatchSnapshot()
  })

  test('Heading', () => {
    expect(screen.getByTestId('categoryTitle')).toHaveTextContent('Speakers')
  })

  test('Categories Component', () => {
    expect(screen.getByTestId('Categories')).toBeTruthy()
  })

  test('About Component', () => {
    expect(screen.getByTestId('About')).toBeTruthy()
  })

  test('Products list', () => {
    expect(useGetProductsByCategories).toHaveBeenCalledWith(
      'speakers',
      undefined
    )
    data.forEach((item) => {
      expect(screen.getByText(new RegExp(item.name))).toBeInTheDocument
    })
  })

  test('Loading', () => {
    useGetProductsByCategories.mockImplementation(() => ({ isLoading: true }))
    render(<Speakers />)

    expect(screen.queryByTestId('Loading')).toBeInTheDocument()
  })

  test('Error', () => {
    expect(screen.queryByTestId('Error')).not.toBeInTheDocument()

    useGetProductsByCategories.mockImplementation(() => ({ isError: true }))
    render(<Speakers />)

    expect(screen.queryByTestId('Error')).toBeInTheDocument()
  })
})
