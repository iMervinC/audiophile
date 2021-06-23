import createHandler from '@/backend/middleware'
import { getAllProducts } from '@/backend/controllers/products'
const handler = createHandler()

handler.get(getAllProducts)

export default handler
