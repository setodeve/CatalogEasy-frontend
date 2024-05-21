import { faImage, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@yamada-ui/fontawesome'
import { Image, VStack } from '@yamada-ui/react'
import type { CSSProperties } from 'react'
import { useRef, useState, useCallback } from 'react'
import { useDrop } from 'react-dnd'
import type { ImageDropProps } from '@/types/image-drop'

const DropZone = ({ index, change }: ImageDropProps) => {
  const [droppedImage, setDroppedImage] = useState<string | null>(null)
  const [droppedImageId, setDroppedImageId] = useState<string | null>(null)
  const [hover, setHover] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  const [, drop] = useDrop(
    () => ({
      accept: 'image',
      drop: (item: { id: string; src: string } | null) => {
        if (item && item.src) {
          setDroppedImage(item.src)
          setDroppedImageId(item.id)
        }
      },
    }),
    [setDroppedImage, setDroppedImageId],
  )

  drop(ref)

  const removeSelectedImage = useCallback(() => {
    setDroppedImage(null)
    change(index, null, null)
  }, [change, index])

  return (
    <>
      {droppedImage ? (
        <VStack ref={ref} style={styles.image}>
          <Icon
            onClick={removeSelectedImage}
            style={styles.imageDelete}
            icon={faXmark}
            size="xl"
            _media={[{ type: 'print', css: { display: 'none' } }]}
          />
          <Image
            src={droppedImage}
            alt="Dropped content"
            style={styles.image}
            onLoad={() => change(index, droppedImage, droppedImageId)}
          />
        </VStack>
      ) : (
        <VStack
          ref={ref}
          style={hover ? styles.hoveredStyle : styles.imageContainer}
          onDragEnter={() => setHover(true)}
          onDrop={() => setHover(false)}
          onDragLeave={() => setHover(false)}
        >
          <Icon icon={faImage} size="6xl" style={styles.noImage} />
        </VStack>
      )}
    </>
  )
}

export default DropZone

const styles: Record<string, CSSProperties> = {
  imageContainer: {
    width: '90%',
    height: '90%',
    border: '1px dotted gray',
    display: 'flex',
    backgroundColor: 'lightgray',
    borderRadius: '15px',
  },
  image: {
    width: '95%',
    height: '95%',
    paddingTop: '(3 / 4 * 100%)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    objectFit: 'contain',
  },
  imageDelete: {
    cursor: 'pointer',
    border: 'none',
    marginLeft: '200px',
    position: 'absolute',
    color: 'red',
  },
  noImage: {
    position: 'relative',
    margin: 'auto',
    color: 'gray',
  },
  hoveredStyle: {
    backgroundColor: '#fffff1',
    color: 'white',
    width: '100%',
    height: '250px',
    border: '1px dotted gray',
    display: 'flex',
    borderRadius: '10px',
  },
}
