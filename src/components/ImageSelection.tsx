import DraggableImage from '@/components/DraggableImage'

import { apiRequest } from '@/utils/apiClient'
import { Box, VStack } from '@yamada-ui/react'
import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
const ImageSelection = () => {
  interface Data {
    [key: string]: string[]
  }
  const [images, setImages] = useState<Data | null>(null)
  const fetchImageData = async () => {
    return apiRequest<ImageData>('GET', `/product_images`)
  }
  const handleImageClick = (url: string) => {
    window.open(url, '_blank')
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

const styles: Record<string, CSSProperties> = {
  container: {
    backgroundColor: '#e5f2fe',
    display: 'inline-block',
    width: '50%',
    // height: '100vh',
    position: 'fixed',
    top: 0,
    right: 0,
    overflow: 'scroll',
    // columnCount: 15,
    gridTemplateRows: 'auto',
  },
  grid: {
    padding: '0.5em',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gridTemplateRows: 'repeat(12, 1fr)',
    // gap: '15px',
    // height: '100vh',
  },
}
