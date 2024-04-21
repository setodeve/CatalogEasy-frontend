import React, { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (bool: boolean) => {
    bool
  },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = Cookies.get('uid')
      if (token) {
        setIsLoggedIn(true)
        if (
          router.pathname === '/auth/login' ||
          router.pathname === '/auth/signup'
        ) {
          router.push('/')
        }
      } else {
        setIsLoggedIn(false)
        // if (router.pathname !== '/auth/login') {
        //   router.push('/auth/login')
        // }
      }
    }

    checkAuthStatus()
  }, [router])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
