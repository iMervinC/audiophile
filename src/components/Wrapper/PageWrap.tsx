import React, { FC, useEffect } from 'react'
import Head from 'next/head'

interface Layout {
  title: string
  otherPage?: boolean
  className?: string
}

const PageWrap: FC<Layout> = ({ title, children, className }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/vercel.svg" />
        <meta name="description" content="Your audio" />
        
      </Head>
      <main className={className}>{children}</main>
    </>
  )
}

export { PageWrap }
