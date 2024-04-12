import { apiRequest } from '@/utils/apiClient'
import { Heading, HStack, Image, VStack } from '@yamada-ui/react'
import { useEffect, useState } from 'react'

export default function Images() {
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
    <VStack>
      <Heading>Images</Heading>
      <HStack
        style={{
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center',
          marginTop: 20,
        }}
      >
        {images
          ? Object.entries(images).map(([key, urls]) =>
              urls.map((url, i) => (
                <Image
                  key={key + `${i}`}
                  src={url}
                  w="300"
                  h="300"
                  alt="image"
                  onClick={() => handleImageClick(url)}
                  style={{ cursor: 'pointer', objectFit: 'cover' }}
                />
              )),
            )
          : null}
      </HStack>
    </VStack>
  )
}
