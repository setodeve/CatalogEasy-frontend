import { Dropzone, IMAGE_ACCEPT_TYPE } from '@yamada-ui/dropzone'
import { HStack, Image, Input, Text, VStack } from '@yamada-ui/react'
import type { FormEventHandler } from 'react'
import React, { useState } from 'react'
import { useAuth } from '@/components/AuthContext'

export default function ImageUpload() {
  const [imgsSrc, setImgsSrc] = useState<string[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const { isLoggedIn } = useAuth()
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setSelectedFiles(filesArray)

      filesArray.forEach((file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const result = reader.result
          if (typeof result === 'string') {
            setImgsSrc((imgs: string[]) => [...imgs, result])
          }
        }
        reader.onerror = () => {
          console.log(reader.error)
        }
      })
    }
  }

  // const showImageInModal = (imageUrls: string[]) => {
  //   return (
  //     <>
  //       {imageUrls.map((url, i) => (
  //         <Modal isOpen={isOpen} onClose={onClose} key={i}>
  //           <Image src={url} alt="image" />
  //         </Modal>
  //       ))}
  //     </>
  //   )
  // }

  const handleSubmit: FormEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    if (isLoggedIn) {
      const formData = new FormData()

      selectedFiles.forEach((file) => {
        formData.append('image[]', file)
      })

      fetch(`http://0.0.0.0:8080/api/product_images`, {
        method: 'POST',
        body: formData,
      })
        .then((res) => {
          if (res.ok) {
            console.log('画像がアップロードされました')
          }
        })
        .catch((error) => {
          console.error('エラー:', error)
        })
    }
  }

  return (
    <>
      <VStack as="form" onSubmit={handleSubmit}>
        <Dropzone
          onChange={onChange}
          accept={IMAGE_ACCEPT_TYPE}
          maxSize={3 * 1024 ** 2}
          multiple
          style={{
            border: '2px dashed gray',
            borderRadius: '5px',
            padding: '20px',
            width: '80%',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'border .24s ease-in-out',
            margin: '50px auto 5px auto',
          }}
        >
          <Text>
            ここにファイルをドラッグ＆ドロップ、またはクリックしてファイルを選択してください
          </Text>
        </Dropzone>
        <Input
          type="submit"
          value="アップロード"
          size="lg"
          width="200"
          style={{
            textAlign: 'center',
            backgroundColor: '#7bc0f9',
            color: 'white',
            cursor: 'pointer',
            border: 0,
            margin: '0 auto',
          }}
        />
      </VStack>

      <HStack
        style={{
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center',
          marginTop: 20,
        }}
      >
        {imgsSrc
          ? imgsSrc.map((link, index) => (
              <Image
                key={index}
                src={link}
                alt={'image' + index}
                w="300"
                h="300"
                style={{ objectFit: 'cover' }}
              />
            ))
          : null}
      </HStack>
    </>
  )
}
