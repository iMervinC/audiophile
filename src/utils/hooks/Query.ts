import { useQuery } from 'react-query'
import axios from 'axios'
import { Products } from '../types'

export const useGetProducts = () => {
  const query = useQuery<Products[]>('Products', async () => {
    const { data } = await axios.get(`/api/products`)
    return data
  })

  return query
}

export const useGetProductsByCategories = (category: Products['category']) => {
  const query = useQuery<Products[]>(['Products', category], async () => {
    const { data } = await axios.get(`/api/products/${category}`)
    return data
  })

  return query
}
