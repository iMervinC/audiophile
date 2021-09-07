import { useEffect } from 'react'
import { apiSlice } from '@/features/store/storeApiSlice'
import { useAppDispatch } from '@/app/hooks'

export type PrefetchOptions =
  | { force?: boolean }
  | {
      ifOlderThan?: false | number
    }
type EndpointNames = keyof typeof apiSlice.endpoints

export function usePrefetchImmediately<T extends EndpointNames>(
  endpoint: T,
  arg: any,
  options: PrefetchOptions = {}
) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(apiSlice.util.prefetch(endpoint, arg, options))
  }, [])
}
