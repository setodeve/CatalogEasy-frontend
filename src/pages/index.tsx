import DynamicForm from '@/components/DynamicForm'
import ImageSelection from '@/components/ImageSelection'
import { Box, HStack } from '@yamada-ui/react'
import { useRouter } from 'next/router'
import { useAuth } from '@/components/AuthContext'
import { useEffect } from 'react'

export default function Home() {
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/login')
    }
  }, [isLoggedIn, router])
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
