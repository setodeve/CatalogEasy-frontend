import { faImage } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@yamada-ui/fontawesome'
import { CloseIcon, Image, VStack } from '@yamada-ui/react'
import type { CSSProperties } from 'react'
import { useState } from 'react'
import { useDrop } from 'react-dnd'
const DropZone = () => {
  const [droppedImage, setDroppedImage] = useState(null)

  const [, drop] = useDrop(() => ({
    accept: 'image',
    drop: (item, monitor) => {
      setDroppedImage(item.src)
    },
  }))
  const removeSelectedImage = () => {
    console.log('deleteimage')
    setDroppedImage(null)
  }
  return (
    <VStack ref={drop} style={styles.imageContainer}>
      {droppedImage ? (
        <>
          <CloseIcon onClick={removeSelectedImage} style={styles.imageDelete} />
          <Image
            src={droppedImage}
            alt="Dropped content"
            style={styles.image}
          />
        </>
      ) : (
        <Icon icon={faImage} size="6xl" style={styles.noImage} />
      )}
      Drop here
    </VStack>
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
}
