import { Box, Button, Modal, ModalBody, useDisclosure } from '@yamada-ui/react'
import { useState } from 'react'
import CSVReader from './CSVReader'

// CSVの行データを扱う型定義
interface CSVData {
  name: string
  size: string
  tradePrice: number
  retailPrice: number
  remark: string | null
  image: string | null
}

export default function CSVDataTable() {
  const [uploadedList, setUploadedList] = useState<CSVData[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleUploadCsv = (data: string[][]) => {
    const formattedData = data
      .map((row) => ({
        name: row[0],
        size: row[1],
        tradePrice: parseFloat(row[2]),
        retailPrice: parseFloat(row[3]),
        remark: null,
        image: null,
      }))
      .filter((d) => d.name && d.size)

    setUploadedList(formattedData)
  }

  const handleOnImport = async () => {
    try {
      console.log('Importing:', uploadedList)
    } catch (error) {
      console.error('Error importing data:', error)
    }
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
              <Button
                onClick={() => {
                  handleOnImport()
                  onClose()
                }}
              >
                インポート実行
              </Button>
            </Box>
          </ModalBody>
        </Modal>
      ) : (
        <Button onClick={onOpen}>Open Modal</Button>
      )}
    </>
  )
}
