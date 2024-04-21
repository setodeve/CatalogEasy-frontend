import DynamicForm from '@/components/DynamicForm'
import ImageSelection from '@/components/ImageSelection'
import { Box, HStack, Loading } from '@yamada-ui/react'
import { useRouter } from 'next/router'
import { useAuth } from '@/components/AuthContext'
import { useState, useEffect } from 'react'

export default function Home() {
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  useEffect(() => {
    if (isLoggedIn === false) {
      router.push('/auth/login')
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
