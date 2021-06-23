import { MyController } from '@/utils/types'

export const getAllProducts: MyController = async (req, res) => {
  const products = await req.db.collection('products').find({}).toArray()

  res.json(products)
}
