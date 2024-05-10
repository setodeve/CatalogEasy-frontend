import axios from 'axios'
import type { FormEventHandler } from 'react'
import { useState } from 'react'
import { VStack, Input, Button } from '@yamada-ui/react'
import { useAuth } from '@/components/AuthContext'
import { login } from '@/utils/auth'
import { useRouter } from 'next/router'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const { setIsLoggedIn } = useAuth()
  const router = useRouter()

  const handleSignUp: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ENDPOINT + '/auth',
        {
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      )
      login(
        response.headers['uid'],
        response.headers['client'],
        response.headers['access-token'],
      )
      setIsLoggedIn(true)
      router.push('/main')
    } catch (error) {
      console.error('Signup error:', error)
    }
  }

  return (
    <VStack
      as="form"
      onSubmit={handleSignUp}
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
      <Input
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        placeholder="パスワードをもう一度入力する"
        required
      />
      <Button type="submit" colorScheme="primary">
        新規登録
      </Button>
    </VStack>
  )
}
