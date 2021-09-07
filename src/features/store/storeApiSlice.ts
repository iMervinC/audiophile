import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Products } from '@/utils/types'
import { sortByNew } from '@/utils/helper'

export const apiSlice = createApi({
  reducerPath: 'storeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/products',
  }),
  endpoints(builder) {
    return {
      getProducts: builder.query<Products[], void>({
        query() {
          return '/'
        },
      }),
      getProductsByCategories: builder.query<
        Products[],
        'earphones' | 'headphones' | 'speakers'
      >({
        query(category) {
          return `/${category}`
        },
        transformResponse(response: Products[]) {
          return response.sort(sortByNew)
        },
      }),
    }
  },
})

export const {
  useGetProductsQuery,
  useGetProductsByCategoriesQuery,
  usePrefetch,
} = apiSlice
