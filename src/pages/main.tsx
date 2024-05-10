import DynamicForm from '@/components/DynamicForm'
import ImageSelection from '@/components/ImageSelection'
import { Box, HStack, Loading } from '@yamada-ui/react'
import { useAuth } from '@/components/AuthContext'

export default function Home() {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
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
