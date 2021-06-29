import { MyController } from '@/utils/types'

export const getAllProducts: MyController = async (req, res) => {
  const products = await req.db.collection('products').find({}).toArray()

  res.json(products)
}

export const getProductCategories: MyController = async (req, res) => {
  const {
    query: { category },
  } = req

  try {
    const products = await req.db
      .collection('products')
      .find({ category })
      .toArray()
    res.json(products)
  } catch (error) {
    console.error(error)
  }
}
