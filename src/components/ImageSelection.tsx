import DraggableImage from '@/components/DraggableImage'
import { VStack } from '@yamada-ui/react'
const ImageSelection = () => {
  return (
    <VStack>
      <DraggableImage
        src="https://picsum.photos/id/237/200/300"
        id="unique-id-1"
      />
    </VStack>
  )
}

export default ImageSelection
