import { MongoClient } from 'mongodb'
import { NextApiResponse } from 'next/types'
import { MyApiRequest } from '@/utils/types'

const client = new MongoClient(process.env.MONGODB_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const dbMiddleware = async (
  req: MyApiRequest,
  res: NextApiResponse,
  next: any
) => {
  try {
    if (!client.isConnected()) await client.connect()
    req.dbClient = client
    req.db = client.db('audiophile')

    console.log('DB Connected')
  } catch (err) {
    await client.close()
    console.error(err)
    throw new Error('Failed to connect to DataBase')
  }
  // finally {
  //   await client.close()
  // }
  return next()
}

export default dbMiddleware
