import axios from 'axios'
import { Products, CartProduct } from './types'

export const fetchByCategory = async (category: Products['category']) => {
  const { data } = await axios.get<Products[]>(
    `http://localhost:3000/api/products/${category}`
  )
  return data
}

export const totalCost = (cart: CartProduct[]) => {
  return (
    cart.length &&
    cart
      .map((item) => item.price! * item.quantity!)
      .reduce((acc, cur) => acc! + cur!)
  )
}

export const sortByNew = (a: Products, b: Products) => {
  return a.new === b.new ? 0 : a.new ? -1 : 1
}
