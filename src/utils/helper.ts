import axios from 'axios'
import { Products } from './types'

export const fetchByCategory = async (category: Products['category']) => {
  const { data } = await axios.get<Products[]>(
    `http://localhost:3000/api/products/${category}`
  )
  return data
}
