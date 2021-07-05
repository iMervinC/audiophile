import createHandler from '@/backend/middleware'
import { getAProduct } from '@/backend/controllers/products'
const handler = createHandler()

handler.get(getAProduct)

export default handler
