import '../styles/globals.css'
import '../styles/components.scss'
import type { AppProps } from 'next/app'
import { Nav, Footer } from '@/components/Sections'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
export default MyApp
