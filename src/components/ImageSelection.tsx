import DraggableImage from '@/components/DraggableImage'
import { Box, VStack } from '@yamada-ui/react'
import type { CSSProperties } from 'react'
const ImageSelection = () => {
  return (
    <VStack style={styles.container} className="hideInPrint">
      <Box style={styles.grid}>
        {Array.from({ length: 100 }).map((_, i) => (
          <DraggableImage
            src={`https://picsum.photos/id/${100 + i}/200/300`}
            id={`unique-id-${i}`}
            key={i}
          />
        ))}
      </Box>
    </VStack>
  )
}

export default ImageSelection

const styles: Record<string, CSSProperties> = {
  container: {
    backgroundColor: '#e5f2fe',
    display: 'inline-block',
    width: '50%',
    height: '100vh',
    position: 'fixed',
    top: 0,
    right: 0,
    overflow: 'scroll',
    // columnCount: 15,
    // gridTemplateRows: 'auto',
  },
  grid: {
    padding: '1em',
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    gridTemplateRows: 'repeat(12, 1fr)',
    gap: '15px',
    height: '100vh',
  },
}
