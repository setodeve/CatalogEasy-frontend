import axios from 'axios'
import type { FormEventHandler } from 'react'
import { useState } from 'react'
import { VStack, Input, Button, useNotice } from '@yamada-ui/react'
import { useAuth } from '@/components/AuthContext'
import { login } from '@/utils/auth'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setIsLoggedIn } = useAuth()
  const router = useRouter()
  const notice = useNotice({ limit: 1 })
  const handleLogin: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ENDPOINT + '/auth/sign_in',
        {
          email,
          password,
        },
      )
      login(
        response.headers['uid'],
        response.headers['client'],
        response.headers['access-token'],
      )
      setIsLoggedIn(true)
      router.push('/main')
      notice({
        description: 'ログインに成功しました',
        placement: 'bottom-right',
      })
    } catch (error) {
      notice({
        description: 'ログインに失敗しました',
        placement: 'bottom-right',
        status: 'error',
      })
      console.error('Login error:', error)
    }
    // try {
    //   const res = await signinUserData({ email, password })
    //   console.log(res)
    //   login(
    //     res.headers['uid'],
    //     res.headers['client'],
    //     res.headers['access-token'],
    //   )
    //   setIsLoggedIn(true)
    //   router.push('/main')
    //   notice({
    //     description: 'ログインに成功しました',
    //     placement: 'bottom-right',
    //   })
    // } catch (err) {
    //   notice({
    //     description: 'ログインに失敗しました',
    //     placement: 'bottom-right',
    //     status: 'error',
    //   })
    //   console.error('Login error:', err)
    // }
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
