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
  useNotice,
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
  const notice = useNotice({ limit: 1 })

  const handleUploadCsv = (data: string[][]) => {
    const formattedData = data
      .map((row) => ({
        name: row[0],
        size: row[1],
        trade_price: parseFloat(row[2]),
        retail_price: parseFloat(row[3]),
        remark: null,
        image: null,
        product_image_id: null,
      }))
      .filter((d) => d.name && d.size)

    setUploadedList(formattedData)
    append(formattedData)
    onClose()
    notice({
      description: 'CSVデータの読み込みに成功しました',
      placement: 'bottom-right',
    })
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
        CSVからインポート
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
