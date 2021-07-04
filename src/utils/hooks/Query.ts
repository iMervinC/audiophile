import { useQuery } from 'react-query'
import axios from 'axios'
import { Products } from '../types'
import { fetchByCategory } from '../helper'

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

export const useGetProductsByCategories = (
  category: Products['category'],
  initialData?: Products[]
) => {
  const { data, isLoading, isError } = useQuery<Products[]>(
    ['Products', category],
    async () => {
      const { data } = await axios.get<Products[]>(`/api/products/${category}`)
      return data
    },
    {
      initialData,
    }
  )

  return { data, isLoading, isError }
}
