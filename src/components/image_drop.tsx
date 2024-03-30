import type { DropEvent, FileRejection } from '@yamada-ui/dropzone'
import { Dropzone } from '@yamada-ui/dropzone'
import { Button, Image, Text, VStack } from '@yamada-ui/react'
import type { CSSProperties } from 'react'
import React, { useState } from 'react'
export default function ImageDrop() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
    }
  }

  const imageDrop = (
    acceptedFiles: File[],
    _fileRejections: FileRejection[],
    _event: DropEvent,
  ) => {
    if (acceptedFiles.length > 0) {
      setSelectedImage(acceptedFiles[0])
    }
  }

  const removeSelectedImage = () => {
    setSelectedImage(null)
  }

  return (
    <>
      <VStack style={styles.container}>
        {selectedImage == null ? (
          <Dropzone w="40%" onChange={imageChange} onDrop={imageDrop}>
            <VStack w="auto" gap="2xs">
              <Text fontSize="xl">Drag file here or click to select file</Text>
              <Text fontSize="sm">
                Attach as many files as you like, each file should not exceed
                3mb
              </Text>
            </VStack>
          </Dropzone>
        ) : (
          <VStack style={styles.container}>
            <Image
              src={URL.createObjectURL(selectedImage)}
              style={styles.image}
              alt="Thumb"
            />
            <Button onClick={removeSelectedImage} style={styles.delete}>
              Remove This Image
            </Button>
          </VStack>
        )}
      </VStack>
    </>
  )
}

const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  // preview: {
  //   marginTop: 50,
  //   display: 'flex',
  //   flexDirection: 'column',
  // },
  image: { maxWidth: 600, justifyContent: 'center', alignItems: 'center' },
  delete: {
    cursor: 'pointer',
    padding: 15,
    background: 'red',
    color: 'white',
    border: 'none',
  },
}
