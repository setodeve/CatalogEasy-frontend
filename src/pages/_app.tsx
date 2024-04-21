import Header from '@/components/Header'
import '@/styles/globals.css'
import { UIProvider } from '@yamada-ui/react'
import type { AppProps } from 'next/app'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { AuthProvider } from '@/components/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UIProvider>
        <DndProvider backend={HTML5Backend}>
          <Header />
          <Component {...pageProps} />
        </DndProvider>
      </UIProvider>
    </AuthProvider>
  )
}
