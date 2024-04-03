import { faImage } from '@fortawesome/free-solid-svg-icons'
import type { DropEvent, FileRejection } from '@yamada-ui/dropzone'
import { Dropzone } from '@yamada-ui/dropzone'
import { Icon } from '@yamada-ui/fontawesome'
import { CloseIcon, Image, VStack } from '@yamada-ui/react'
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
        {selectedImage === null ? (
          <Dropzone
            style={styles.container}
            onChange={imageChange}
            onDrop={imageDrop}
          >
            <Icon icon={faImage} size="6xl" />
          </Dropzone>
        ) : (
          <VStack style={styles.container}>
            <CloseIcon onClick={removeSelectedImage} style={styles.delete} />
            <Image
              src={URL.createObjectURL(selectedImage)}
              style={styles.image}
              alt="product image"
            />
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
  delete: {
    cursor: 'pointer',
    border: 'none',
    marginBottom: '370px',
    marginLeft: '340px',
    position: 'absolute',
    color: 'red',
  },
}
