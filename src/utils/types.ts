import type { Db, MongoClient } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next/types'

export interface Products {
  id: number
  slug: string
  name: string
  image: Image
  category: string
  new: boolean
  price: number
  description: string
  features: string
  includes: Include[]
  gallery: Gallery
  others: Other[]
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
