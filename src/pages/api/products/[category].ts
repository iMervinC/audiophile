import createHandler from '@/backend/middleware'
import { getProductCategories } from '@/backend/controllers/products'
const handler = createHandler()

handler.get(getProductCategories)

export default handler
