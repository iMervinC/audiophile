import '../styles/globals.css'
import '../styles/components.scss'
import type { AppProps } from 'next/app'
import { Nav, Footer } from '@/components/Sections'
import { Providers } from '@/components/Wrapper'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </Providers>
  )
}
export default MyApp
