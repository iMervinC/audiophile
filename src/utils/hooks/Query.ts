import { useQuery } from 'react-query'
import axios from 'axios'
import { Products } from '../types'

export const useGetProducts = () => {
  const { data, isLoading, isError } = useQuery<Products[]>(
    'Products',
    async () => {
      const { data } = await axios.get(`/api/products`)
      return data
    }
  )

  return { data, isLoading, isError }
}

export const useGetProductsByCategories = (category: Products['category']) => {
  const { data, isLoading, isError } = useQuery<Products[]>(
    ['Products', category],
    async () => {
      const { data } = await axios.get(`/api/products/${category}`)
      return data
    }
  )

  return { data, isLoading, isError }
}
