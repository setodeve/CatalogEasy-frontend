import { Box, Button, Modal, ModalBody, useDisclosure } from '@yamada-ui/react'
import { useState } from 'react'
import CSVReader from './CSVReader'
export default function CSVDataTable() {
  const [uploadedList, setUploadedList] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleUploadCsv = (data: any) => {
    const _formattedData = data
      .map((d: any) => {
        return {
          name: d[0],
          size: d[1],
          tradePrice: d[2],
          retailPrice: d[3],
          remark: null,
          image: null,
        }
      })
      .filter((d: any) => d != null)

    setUploadedList(_formattedData)
  }

  const handleOnImport = async () => {
    console.log(uploadedList)
  }
  return (
    <>
      {isOpen ? (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalBody>
            <Box>
              <CSVReader setUploadedData={handleUploadCsv} />
            </Box>
            <Box>
              <Button onClick={() => handleOnImport()}>インポート実行</Button>
            </Box>
          </ModalBody>
        </Modal>
      ) : (
        <Button onClick={onOpen}>Open Modal</Button>
      )}
    </>
  )
}
