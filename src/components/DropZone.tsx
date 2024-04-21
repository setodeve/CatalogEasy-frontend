import { faImage, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@yamada-ui/fontawesome'
import { Image, VStack } from '@yamada-ui/react'
import type { CSSProperties } from 'react'
import { useState } from 'react'
import { useDrop } from 'react-dnd'
const DropZone = ({
  index,
  change,
}: {
  index: number
  change: (
    index: number,
    image: string | null,
    product_image_id: string | null,
  ) => void
}) => {
  const [droppedImage, setDroppedImage] = useState<string | null>(null)
  const [droppedImageId, setDroppedImageId] = useState<string | null>(null)
  const [hover, setHover] = useState(false)
  const [, drop] = useDrop(() => ({
    accept: 'image',
    drop: (item: { id: string; src: string } | null) => {
      if (item && item.src) {
        setDroppedImage(item.src)
        setDroppedImageId(item.id)
      }
    },
  }))

  const removeSelectedImage = () => {
    setDroppedImage(null)
    change(index, null, null)
  }

  return (
    <>
      {droppedImage ? (
        <VStack ref={drop} style={styles.image}>
          <Icon
            onClick={removeSelectedImage}
            style={styles.imageDelete}
            icon={faXmark}
            size="2xl"
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
    height: '260px',
    border: '1px dotted gray',
    display: 'flex',
    backgroundColor: 'lightgray',
    borderRadius: '15px',
  },
  image: {
    width: '100%',
    height: '100%',
    paddingTop: '(3 / 4 * 100%)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // marginTop: '-270px',
    // borderRadius: '10px',
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
