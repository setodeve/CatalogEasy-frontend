import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { fetchSessionData } from '@/utils/fetchData'
import Cookies from 'js-cookie'
import { Loading } from '@yamada-ui/react'

type AuthContextType = {
  isLoggedIn: boolean | null
  setIsLoggedIn: (bool: boolean) => void
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: null,
  setIsLoggedIn: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [isRouter, setIsRouter] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (isRouter === router.pathname) {
      return
    }
    setIsRouter(router.pathname)

    const checkAuthStatus = async () => {
      const uid = Cookies.get('uid')

      const sessionData = await fetchSessionData()
      // @ts-expect-error expect including is_login
      const shouldLogIn = sessionData.is_login && uid !== undefined

      if (isLoggedIn !== shouldLogIn) {
        setIsLoggedIn(shouldLogIn)
        if (
          !shouldLogIn &&
          ['/', '/toc', '/pp'].every((item) => item !== router.pathname)
        ) {
          router.push('/auth/login')
        } else if (
          shouldLogIn &&
          ['/auth/login', '/auth/signup'].some(
            (item) => item === router.pathname,
          )
        ) {
          router.push('/main')
        }
      }
    }

    checkAuthStatus()
  }, [isLoggedIn, router.pathname, isRouter, router])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {isLoggedIn !== null ? children : <Loading />}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
