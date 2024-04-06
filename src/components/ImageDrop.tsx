import DropZone from '@/components/DropZone'
import { VStack } from '@yamada-ui/react'
import type { CSSProperties } from 'react'
export default function ImageDrop({ index, change }) {
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
  image: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageDelete: {
    cursor: 'pointer',
    border: 'none',
    marginBottom: '230px',
    marginLeft: '280px',
    position: 'absolute',
    color: 'red',
  },
}
