import { QueryFunction, QueryKey, useQuery } from 'react-query'
import axios from 'axios'
import { Products } from '../types'
import { fetchByCategory } from '../helper'

const fetcher: QueryFunction<Products[], QueryKey> = async () => {
  const { data } = await axios.get(`/api/products`)
  return data
}

export const useGetProducts = () => {
  const { data, isLoading, isError } = useQuery<Products[]>('Products', fetcher)

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
