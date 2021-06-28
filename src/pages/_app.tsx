import '../styles/globals.css'
import '../styles/components.scss'
import type { AppProps } from 'next/app'
import { Nav } from '@/components/Sections'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
