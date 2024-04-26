import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '@/styles/globals.css'
import { UIProvider } from '@yamada-ui/react'
import type { AppProps } from 'next/app'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { AuthProvider } from '@/components/AuthContext'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>CatalogEasy</title>
        <link
          rel="icon"
          href="../catalogcat_white.png"
          media="(prefers-color-scheme: dark)"
          sizes="any"
          type="image/x-icon"
        />
        <link
          rel="icon"
          href="../catalogcat_black.png"
          media="(prefers-color-scheme: light)"
          sizes="any"
          type="image/x-icon"
        />
      </Head>
      <AuthProvider>
        <UIProvider>
          <DndProvider backend={HTML5Backend}>
            <Header />
            <Component {...pageProps} />
            {['/lp', '/toc', '/pp'].some((item) => item === router.pathname) ? (
              <Footer />
            ) : null}
          </DndProvider>
        </UIProvider>
      </AuthProvider>
    </>
  )
}
