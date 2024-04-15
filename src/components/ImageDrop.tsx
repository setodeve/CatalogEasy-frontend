import DropZone from '@/components/DropZone'
import type { ImageDropProps } from '@/types/image-drop'
import { VStack } from '@yamada-ui/react'
import type { CSSProperties } from 'react'

export default function ImageDrop({ index, change }: ImageDropProps) {
  return (
    <>
      <VStack style={styles.imageContainer}>
        <DropZone index={index} change={change} />
      </VStack>
    </>
  )
}
const styles: Record<string, CSSProperties> = {
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    width: 250,
    height: 250,
    margin: 'auto',
  },
}
