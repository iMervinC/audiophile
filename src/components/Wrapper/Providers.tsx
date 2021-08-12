import { ReactNode } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { ReactQueryDevtools } from 'react-query/devtools'
// import { CartProvider } from '@/utils/hooks/Cart'

const queryClient = new QueryClient()

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  )
}

export default Providers
