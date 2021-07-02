import { render, fireEvent, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Headphones from '../headphones'
import { useGetProductsByCategories } from '@/utils/hooks'

const queryClient = new QueryClient()
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

jest.mock('@/utils/hooks', () => ({
  useGetProductsByCategories: jest.fn(),
}))

describe('Headphones Page', () => {
  beforeEach(() => {
    useGetProductsByCategories.mockImplementation(() => ({}))
    render(<Headphones />, { wrapper })
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

  test('Products QHook', () => {
    expect(useGetProductsByCategories).toHaveBeenCalledWith('headphones')
  })

  test('Products', () => {
    expect(screen.getByTestId('Products list')).toBeTruthy()
  })

  test('Loading', () => {
    useGetProductsByCategories.mockImplementation(() => ({ isLoading: true }))
    render(<Headphones />, { wrapper })

    expect(screen.getByTestId('Loading')).toBeTruthy()
  })

  test('Error', () => {
    useGetProductsByCategories.mockImplementation(() => ({ isError: true }))
    const { getByTestId } = render(<Headphones />, { wrapper })

    expect(getByTestId('Error')).toBeTruthy()
  })
})
