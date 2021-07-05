import { MyController } from '@/utils/types'

export const getAllProducts: MyController = async (req, res) => {
  try {
    const products = await req.db.collection('products').find({}).toArray()

    res.json(products)
  } catch (error) {
    res.json(error)
  }
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
    res.json(error)
  }
}

export const getAProduct: MyController = async (req, res) => {
  const {
    query: { slug },
  } = req
  try {
    const product = await req.db.collection('products').findOne({ slug })

    res.json(product)
  } catch (error) {
    console.error(error)
    res.json(error)
  }
}
