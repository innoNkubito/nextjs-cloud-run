import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import NavBar from "../components/NavBar"

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div className="h-full w-full">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className="h-1/5">
      <NavBar />
    </header>
    {/* Body */}
    <div className="h-screen bg-gray-300">
      {children}
    </div>
    <footer className="h-1/5">
      {/* <hr />
      <span>I'm here to stay (Footer)</span> */}
    </footer>
  </div>
)

export default Layout
