import { render, fireEvent } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import nock from 'nock'
import { useGetProducts, useGetProductsByCategories, useGetScroll } from '../'

// describe('Query hooks', () => {
//   const queryClient = new QueryClient()
//   const wrapper = ({ children }: { children: ReactNode }) => (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   )

//   test('useGetProducts', async () => {
//     const {
//       result: {
//         current: { data, status, isSuccess },
//       },
//       waitFor,
//     } = renderHook(() => useGetProducts(), { wrapper })

//     const expectation = nock('/api')
//       .get('/products')
//       .reply(200, [
//         {
//           _id: '60d2dfd21494364318e114fe',
//           id: 4,
//           slug: 'xx99-mark-two-headphones',
//           name: 'XX99 Mark II Headphones',
//         },
//       ])
//     // await waitFor(() => isSuccess)
//     expect(isSuccess).toBe(false)
//   })
// })

describe('Get Scroll Position', () => {
  const {
    result: {
      current: { scrollY },
    },
  } = renderHook(() => useGetScroll())

  test('Initial Position', () => {
    expect(scrollY).toBe(0)
  })
})
