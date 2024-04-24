import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { fetchSessionData } from '@/utils/fetchData'
import Cookies from 'js-cookie'

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
  const router = useRouter()

  useEffect(() => {
    const checkAuthStatus = async () => {
      const uid = Cookies.get('uid')
      const sessionData = await fetchSessionData()
      const shouldLogIn = sessionData.is_login && uid !== undefined

      if (isLoggedIn !== shouldLogIn) {
        setIsLoggedIn(shouldLogIn)
        if (!shouldLogIn && router.pathname !== '/usage') {
          router.push('/auth/login')
        } else if (
          shouldLogIn &&
          (router.pathname === '/auth/login' ||
            router.pathname === '/auth/signup')
        ) {
          router.push('/')
        }
      }
    }

    checkAuthStatus()
  }, [isLoggedIn, router.pathname])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {isLoggedIn !== null ? children : null}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
