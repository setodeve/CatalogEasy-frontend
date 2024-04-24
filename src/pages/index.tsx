import DynamicForm from '@/components/DynamicForm'
import ImageSelection from '@/components/ImageSelection'
import { Box, HStack, Loading, useNotice } from '@yamada-ui/react'
import { useRouter } from 'next/router'
import { useAuth } from '@/components/AuthContext'
import { useState, useEffect } from 'react'

export default function Home() {
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const notice = useNotice({ limit: 1 })
  useEffect(() => {
    if (isLoggedIn === false) {
      router.push('/auth/login')
      notice({
        description: 'ログインしてください',
        placement: 'bottom-right',
        status: 'warning',
      })
    } else if (isLoggedIn === true) {
      setIsChecking(false)
    }
  }, [isLoggedIn, router])

  if (isChecking) {
    return (
      <Loading
        variant="rings"
        size="9xl"
        color="blue.500"
        style={{ margin: '30% 50%' }}
      />
    )
  }

  return (
    <main>
      <HStack>
        <DynamicForm />
        <Box className="hideInPrint">
          <ImageSelection />
        </Box>
      </HStack>
    </main>
  )
}
