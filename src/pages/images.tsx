import type { ImagesData } from '@/types/images'
import { fetchImageData } from '@/utils/fetchData'
import { Heading, HStack, Image, useNotice, VStack } from '@yamada-ui/react'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AuthContext'
export default function Images() {
  const [images, setImages] = useState<ImagesData | null>(null)
  const { isLoggedIn } = useAuth()
  const handleImageClick = (url: string) => {
    window.open(url, '_blank')
  }
  const notice = useNotice({ limit: 1 })
  useEffect(() => {
    if (isLoggedIn)
      fetchImageData()
        .then((res) => {
          setImages(res)
        })
        .catch((err) => {
          console.error(err)
          notice({
            description: '画像データ取得に失敗しました',
            placement: 'bottom-right',
            status: 'error',
          })
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

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
