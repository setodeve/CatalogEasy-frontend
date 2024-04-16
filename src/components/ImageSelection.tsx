import DraggableImage from '@/components/DraggableImage'
import type { ImageSelectionData } from '@/types/image-selection'
import { fetchImageData } from '@/utils/fetchData'
import { Box, VStack } from '@yamada-ui/react'
import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'

const ImageSelection = () => {
  const [images, setImages] = useState<ImageSelectionData | null>(null)

  const handleImageClick = (url: string) => {
    window.open(url, '_blank')
  }

  const styles: Record<string, CSSProperties> = {
    container: {
      // backgroundColor: '#e5f2fe',
      display: 'flex',
      width: '50%',
      // height: '100vh',
      position: 'fixed',
      top: 0,
      right: 0,
      overflow: 'scroll',
      // columnCount: 15,
      gridTemplateRows: 'auto',
      // boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    },
    grid: {
      padding: '0.5em',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gridTemplateRows: 'repeat(12, 1fr)',
      // gap: '15px',
      height: '100vh',
    },
  }

  useEffect(() => {
    fetchImageData()
      .then((res) => {
        setImages(res)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <VStack style={styles.container} className="hideInPrint">
      <Box style={styles.grid}>
        {images
          ? Object.entries(images).map(([key, urls]) =>
              urls.map((url, i) => (
                <DraggableImage
                  src={url}
                  id={key + `,${i}`}
                  key={key + `${i}`}
                  clickEvent={handleImageClick}
                />
              )),
            )
          : null}
      </Box>
    </VStack>
  )
}

export default ImageSelection
