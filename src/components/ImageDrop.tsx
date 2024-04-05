import DropZone from '@/components/DropZone'
import { CloseIcon, Image, VStack } from '@yamada-ui/react'
import type { CSSProperties } from 'react'
import React, { useState } from 'react'
export default function ImageDrop({ product, field, update, index }) {
  const [selectedImage, setSelectedImage] = useState<File | string | null>(null)
  const [isImageSelected, setIsImageSelected] = useState(false)
  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
      setIsImageSelected(true)
    }
  }
  // const onDrop = useCallback((acceptedFiles) => {
  // }, [])
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const handleRemove = () => {
    const updatedItem = { ...product[index], image: null }
    console.log(product)
    // console.log(index)
    update(index, updatedItem)
  }
  // const imageDrop = (
  //   acceptedFiles: File[] | string,
  //   e: React.DragEvent<HTMLImageElement>,
  // ) => {
  //   if (typeof acceptedFiles == 'string') {
  //     setSelectedImage(e.dataTransfer.getData('text/plain'))
  //   }
  //   if (acceptedFiles.length > 0) {
  //     const file =
  //       acceptedFiles[0] instanceof File
  //         ? acceptedFiles[0]
  //         : new Blob([acceptedFiles[0]])
  //     setSelectedImage(URL.createObjectURL(file))
  //     setIsImageSelected(true)
  //   }
  // }
  const imageDrop = (
    acceptedFiles: File[],
    e: React.DragEvent<HTMLDivElement>,
  ) => {
    if (e.dataTransfer) {
      const url = e.dataTransfer.getData('text/plain')
      setSelectedImage(url)
      setIsImageSelected(true)
    } else if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      setSelectedImage(URL.createObjectURL(file))
      setIsImageSelected(true)
    }
  }
  const removeSelectedImage = () => {
    setSelectedImage(null)
    setIsImageSelected(false)
    handleRemove()
  }

  const handleDragOver = (e: React.DragEvent<HTMLImageElement>) => {
    console.log(e.dataTransfer.getData('text/plain'))
    e.preventDefault()
  }

  return (
    <>
      <VStack style={styles.imageContainer}>
        {/* <Dropzone
          style={
            (styles.container, { display: isImageSelected ? 'none' : 'flex' })
          }
          onDrop={(
            acceptedFiles: File[],
            e: React.DragEvent<HTMLImageElement>,
          ) => imageDrop(acceptedFiles, e)}
          onDragOver={handleDragOver}
          name="image"
          type="file"
          {...field}
        >
          <Icon icon={faImage} size="6xl" />
        </Dropzone> */}
        <DropZone />
        {selectedImage ? (
          <VStack style={styles.imageContainer}>
            <CloseIcon
              onClick={removeSelectedImage}
              style={styles.imageDelete}
            />
            <Image src={selectedImage} style={styles.image} alt="product" />
          </VStack>
        ) : null}
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
