import { Image, Loading } from '@yamada-ui/react'
import type { CSSProperties, LegacyRef } from 'react'
import { useDrag } from 'react-dnd'

const DraggableImage = ({
  src,
  id,
  clickEvent,
}: {
  src: string
  id: string
  clickEvent?: (src: string) => void
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'image',
    item: { id, src },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const styles: Record<string, CSSProperties> = {
    item: {
      maxWidth: '250px',
      // border: '2px solid #ffa94d',
      border: isDragging ? '1px dashed gray' : 'none',
      opacity: isDragging ? 0.3 : 1,
      // borderRadius: '8px',
      // padding: '0.5rem',
      // margin: '0.2rem',
      breakInside: 'avoid',
      cursor: 'pointer',
      objectFit: 'cover',
      marginTop: '10px',
    },
  }

  return (
    <Image
      w="250px"
      h="250px"
      _media={[{ type: 'print', css: { display: 'none' } }]}
      ref={drag as unknown as LegacyRef<HTMLImageElement>}
      src={src}
      id={id}
      alt="Draggable"
      onClick={() => {
        if (clickEvent) {
          clickEvent(src)
        }
      }}
      style={styles.item}
      fallback={<Loading size="3xl" margin="auto" />}
    />
  )
}

export default DraggableImage
