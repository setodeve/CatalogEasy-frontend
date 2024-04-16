import type { CSVData } from '@/types/csv-data-table'
import { faFileImport } from '@fortawesome/free-solid-svg-icons'
import { Icon as FontAwesomeIcon } from '@yamada-ui/fontawesome'
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
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
  const [_, setUploadedList] = useState<CSVData[]>([])
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
      <Button
        onClick={onOpen}
        colorScheme="primary"
        size="xl"
        style={{
          padding: '10px',
        }}
        leftIcon={<FontAwesomeIcon icon={faFileImport} />}
      >
        Import CSV
      </Button>
      {isOpen ? (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalCloseButton color="red.500" />
          <ModalOverlay backdropFilter="blur(10px)" />
          <ModalHeader>Import CSV</ModalHeader>
          <ModalBody bg="white">
            <Box>
              <CSVReader setUploadedData={handleUploadCsv} />
            </Box>
          </ModalBody>
        </Modal>
      ) : null}
    </>
  )
}
