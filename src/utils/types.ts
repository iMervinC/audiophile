import type { Db, MongoClient } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next/types'
import { Dispatch, SetStateAction } from 'react'
import { UseFormRegister } from 'react-hook-form'

export interface CartProduct {
  _id?: string
  id?: number
  slug?: string
  name?: string
  price?: number
  quantity?: number
  image?: Image
}

export interface InitialCartState {
  cart: CartProduct[]
}

export type CartAction =
  | { type: 'PRIME_CART'; payload: InitialCartState }
  | { type: 'ADD'; payload: CartProduct }
  | { type: 'DELETE'; slug: string }
  | { type: 'CLEAR_CART' }
  | { type: 'UPDATE_ITEM'; payload: CartProduct }
export interface Products {
  id?: number
  slug: string
  name: string
  image?: Image
  category?: 'earphones' | 'headphones' | 'speakers'
  new?: boolean
  price: number
  description?: string
  features?: string
  includes?: Include[]
  gallery?: Gallery
  others?: Other[]
}

export interface Gallery {
  first: Image
  second: Image
  third: Image
}

export interface Image {
  mobile: string
  tablet: string
  desktop: string
}

export interface Include {
  quantity: number
  item: string
}

export interface Other {
  slug: string
  name: string
  image: Image
}

export interface MyApiRequest extends NextApiRequest {
  dbClient: MongoClient
  db: Db
}

export type MyController<T = any> = (
  req: MyApiRequest,
  res: NextApiResponse<T>
) => Promise<void>

export type Navigation = 'home' | 'headphones' | 'speakers' | 'earphones'

export interface CheckoutT {
  name: string
  email: string
  phone: string
  address: string
  zip: number
  city: string
  country: string
  paymentMethod: 'e-money' | 'cod'
  'e-moneypin': string
  'e-moneynum': string
}
export interface TF {
  name?:
    | 'name'
    | 'address'
    | 'phone'
    | 'zip'
    | 'city'
    | 'country'
    | 'e-moneypin'
    | 'e-moneynum'
  id?: string
  placeholder: string
  label: string
  type?: 'text' | 'email' | 'tel' | 'number'
  register: UseFormRegister<CheckoutT>
}

export interface RadioT {
  name?: 'paymentMethod'
  value: CheckoutT['paymentMethod']
  id?: string
  placeholder: string
  selected?: boolean
  register: UseFormRegister<CheckoutT>
}

export interface CounterT {
  count: number
  setCount: Dispatch<SetStateAction<number>>
}
