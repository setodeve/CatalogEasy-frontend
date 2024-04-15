import type { CSVData } from '@/types/csv-data-table'
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  useDisclosure,
} from '@yamada-ui/react'
import { useState } from 'react'
import CSVReader from './CSVReader'

export default function CSVDataTable({
  append,
}: {
  append: (data: CSVData[]) => void
}) {
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
        imageId: null,
      }))
      .filter((d) => d.name && d.size)

    setUploadedList(formattedData)
    append(formattedData)
    onClose()
  }

  return (
    <>
      {isOpen ? (
        <Modal isOpen={isOpen} onClose={onClose} style={{ zIndex: 2000 }}>
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
          <ModalBody>
            <Box>
              <CSVReader setUploadedData={handleUploadCsv} />
            </Box>
          </ModalBody>
        </Modal>
      ) : (
        <Button
          onClick={onOpen}
          style={{
            backgroundColor: '#7bc0f9',
            color: 'white',
            padding: '10px',
          }}
        >
          Import CSV
        </Button>
      )}
    </>
  )
}
