import { faImage } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@yamada-ui/fontawesome'
import { CloseIcon, Image, VStack } from '@yamada-ui/react'
import type { CSSProperties } from 'react'
import { useState } from 'react'
import { useDrop } from 'react-dnd'
const DropZone = ({
  index,
  change,
}: {
  index: number
  change: (index: number, image: string | null) => void
}) => {
  const [droppedImage, setDroppedImage] = useState<string | null>(null)
  const [hover, setHover] = useState(false)
  const [, drop] = useDrop(() => ({
    accept: 'image',
    drop: (item: { src: string } | null) => {
      if (item) {
        setDroppedImage(item.src)
      }
    },
  }))

  const removeSelectedImage = () => {
    setDroppedImage(null)
    change(index, null)
  }

  return (
    <>
      {droppedImage ? (
        <VStack ref={drop} style={styles.imageContainer}>
          <CloseIcon onClick={removeSelectedImage} style={styles.imageDelete} />
          <Image
            src={droppedImage}
            alt="Dropped content"
            style={styles.image}
            onLoad={() => change(index, droppedImage)}
          />
        </VStack>
      ) : (
        <VStack
          ref={drop}
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
    width: '100%',
    height: '250px',
    border: '1px dotted gray',
    display: 'flex',
    backgroundColor: 'lightgray',
    borderRadius: '10px',
  },
  image: {
    width: '100%',
    height: '100%',
    paddingTop: '(3 / 4 * 100%)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  imageDelete: {
    cursor: 'pointer',
    border: 'none',
    marginBottom: '230px',
    marginLeft: '280px',
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
