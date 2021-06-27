import React, { FC, useEffect } from 'react'
import Head from 'next/head'

interface Layout {
  title: string
  otherPage?: boolean
}

const PageWrap: FC<Layout> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/vercel.svg" />
        <meta name="description" content="Your audio" />
      </Head>
      <main>{children}</main>
    </>
  )
}

export { PageWrap }
