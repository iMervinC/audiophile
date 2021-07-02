import { render, fireEvent, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Earphones from '../earphones'
import { useGetProductsByCategories } from '@/utils/hooks'

const queryClient = new QueryClient()
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

jest.mock('@/utils/hooks', () => ({
  useGetProductsByCategories: jest.fn(),
}))

describe('Earphone', () => {
  beforeEach(() => {
    useGetProductsByCategories.mockImplementation(() => ({}))
    render(<Earphones />, { wrapper })
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

  test('Products', () => {
    useGetProductsByCategories.mockImplementation(() => ({
      data: [
        {
          id: 1,
          name: 'YX1 Wireless Earphones',
          slug: 'yx1-earphones',
          category: 'earphones',
          new: true,
        },
      ],
    }))

    const { getByTestId } = render(<Earphones />, { wrapper })
    expect(useGetProductsByCategories).toHaveBeenCalledWith('earphones')
    expect(getByTestId('yx1-earphones')).toBeTruthy()
  })

  test('Loading', () => {
    useGetProductsByCategories.mockImplementation(() => ({ isLoading: true }))
    render(<Earphones />, { wrapper })

    expect(screen.getByTestId('Loading')).toBeTruthy()
  })

  test('Error', () => {
    useGetProductsByCategories.mockImplementation(() => ({ isError: true }))
    const { getByTestId } = render(<Earphones />, { wrapper })

    expect(getByTestId('Error')).toBeTruthy()
  })
})
