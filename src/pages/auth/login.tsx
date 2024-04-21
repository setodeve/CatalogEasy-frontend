import axios from 'axios'
import type { FormEventHandler } from 'react'
import { useState } from 'react'
import { VStack, Input, Button } from '@yamada-ui/react'
import { useAuth } from '@/components/AuthContext'
import { login } from '@/utils/auth'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setIsLoggedIn } = useAuth()
  const router = useRouter()
  const handleLogin: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/sign_in',
        {
          email,
          password,
        },
      )
      // const cookieSetting = { expires: 7, secure: true, sameSite: 'strict' }
      // Cookies.set('uid', response.headers['uid'], cookieSetting)
      // Cookies.set('client', response.headers['client'], cookieSetting)
      // Cookies.set(
      //   'access-token',
      //   response.headers['access-token'],
      //   cookieSetting,
      // )
      // setIsLoggedIn(true)
      login(
        response.headers['uid'],
        response.headers['client'],
        response.headers['access-token'],
      )
      setIsLoggedIn(true)
      router.push('/')
      console.log('Login success:', response)
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <VStack
      as="form"
      onSubmit={handleLogin}
      maxW="300px"
      style={{ margin: '50px auto' }}
    >
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="メールアドレス"
        required
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワード"
        required
      />
      <Button type="submit" colorScheme="primary">
        ログイン
      </Button>
    </VStack>
  )
}
