import { Image } from '@yamada-ui/react'
import type { CSSProperties, LegacyRef } from 'react'
import { useDrag } from 'react-dnd'
const DraggableImage = ({ src, id }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'image',
    item: { id, src },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <Image
      _media={[{ type: 'print', css: { display: 'none' } }]}
      ref={drag as unknown as LegacyRef<HTMLImageElement>}
      src={src}
      alt="Draggable"
      style={
        (styles.item,
        {
          border: isDragging ? '2px dashed gray' : 'none',
          opacity: isDragging ? 0.5 : 1,
        })
      }
    />
  )
}

export default DraggableImage

const styles: Record<string, CSSProperties> = {
  item: {
    maxWidth: '100px',
    border: '2px solid #ffa94d',
    borderRadius: '8px',
    padding: '0.5rem',
    breakInside: 'avoid',
  },
}
