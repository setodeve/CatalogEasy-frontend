import type { LegacyRef } from 'react'
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
    <img
      ref={drag as unknown as LegacyRef<HTMLImageElement>}
      src={src}
      style={{
        border: isDragging ? '2px dashed gray' : 'none',
        opacity: isDragging ? 0.5 : 1,
        maxWidth: '100px', // 画像のサイズを調整する
      }}
      alt="Draggable"
    />
  )
}

export default DraggableImage
