import React, { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

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
      const token = Cookies.get('uid')
      if (token) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }

    checkAuthStatus()
  }, [])

  useEffect(() => {
    if (
      isLoggedIn === false &&
      router.pathname !== '/auth/login' &&
      router.pathname !== '/auth/signup'
    ) {
      router.push('/auth/login')
    } else if (
      isLoggedIn === true &&
      (router.pathname === '/auth/login' || router.pathname === '/auth/signup')
    ) {
      router.push('/')
    }
  }, [isLoggedIn, router.pathname, router])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {isLoggedIn === null ? null : children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
