import DynamicForm from '@/components/DynamicForm'
import ImageSelection from '@/components/ImageSelection'
import { Box, HStack } from '@yamada-ui/react'
export default function Home() {
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
