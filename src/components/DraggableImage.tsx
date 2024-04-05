// const DraggableImage = ({ src, alt }: { src: string; alt: string }) => {
//   const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
//     e.dataTransfer.setData('text/plain', src)
//     // e.dataTransfer.effectAllowed = 'linkMove'
//     // e.dataTransfer.dropEffect = 'move'
//     // console.log(e.dataTransfer.getData('text/plain'))
//   }
//   const handleDragOver = (e: React.DragEvent<HTMLImageElement>) => {
//     e.preventDefault()
//     // console.log('drag over')
//   }

import { useDrag } from 'react-dnd'

//   return (
//     <>
//       <img
//         src={src}
//         alt={alt}
//         draggable="true"
//         onDragStart={handleDragStart}
//         onDragOver={handleDragOver}
//         style={{ width: 100, height: 'auto', cursor: 'grab' }}
//       />
//     </>
//   )
// }
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
      ref={drag}
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
