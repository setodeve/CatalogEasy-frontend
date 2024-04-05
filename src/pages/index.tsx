import DraggableImage from '@/components/draggableImage'
import DynamicForm from '@/components/DynamicForm'
import { HStack } from '@yamada-ui/react'
export default function Home() {
  return (
    <main>
      {/* <ImageUpload /> */}
      {/* <img
        src="http://localhost:8080/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e932d13a04edec213de2fb547737098531f77939/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-03-26%20%E5%8D%88%E5%BE%8C6.32.20.png"
        alt=""
      /> */}
      {/* <DynamicForm /> */}
      <HStack>
        <div>
          <DynamicForm />
        </div>
        <div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <DraggableImage
              src="https://picsum.photos/id/237/200/300"
              id="unique-id-1"
            />
          </div>
          {/* <img id="drag-image" src="../public/test.png" alt="" />
          <img
            draggable="true"
            src="https://picsum.photos/id/237/200/300"
            alt=""
          /> */}
        </div>
      </HStack>

      {/* <div className="page">
        <ImageDrop />
        <ImageDrop />
      </div>
      <div className="book">
        <div className="page">
          <div className="subpage">Page 1/2</div>
        </div>
        <div className="page">
          <div className="subpage">Page 2/2</div>
        </div>
      </div> */}
    </main>
  )
}
