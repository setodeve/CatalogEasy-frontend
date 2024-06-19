import {
  Heading,
  Link,
  GridItem,
  HStack,
  Button,
  Modal,
  ModalBody,
  Tooltip,
  useDisclosure,
  VStack,
  Input,
  useNotice,
  Badge,
} from '@yamada-ui/react'
import type { CatalogData } from '@/types/catalogs'
import { Icon as FontAwesomeIcon } from '@yamada-ui/fontawesome'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import type { MouseEvent } from 'react'
import { useState } from 'react'
import { changeCatalogNameData } from '@/utils/fetchData'

const getFormattedDate = (date: string): string =>
  new Date(Date.parse(date)).toLocaleString()

const App = ({
  catalog,
  catalog_key,
}: {
  catalog: CatalogData[keyof CatalogData]
  catalog_key: string
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState<string>(catalog.name)
  const test = (e: MouseEvent) => {
    e.preventDefault()
    onOpen()
  }
  const notice = useNotice({ limit: 1 })
  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault()
    changeCatalogNameData(catalog.id, name)
      .then(() => {
        notice({
          description: 'カタログ名変更に成功しました',
          placement: 'bottom-right',
        })
        onClose()
      })
      .catch((err) => {
        console.error('Error updating catalog name:', err)
        notice({
          description: 'カタログ名変更に失敗しました',
          placement: 'bottom-right',
          status: 'error',
        })
      })
  }
  console.log(new Date().toDateString)
  const todayFlg =
    new Date().toDateString() === new Date(catalog.created_at).toDateString()
  return (
    <Link href={`/catalog/${catalog_key}`} key={catalog_key}>
      <GridItem h="4xs" rounded="md" bg="primary" padding={2} color="white">
        <HStack>
          <Heading as="h5" size="md" isTruncated>
            {name}
          </Heading>
          <Tooltip label="カタログ名を変更できます">
            <Button onClick={test} zIndex="100" size="xs">
              <FontAwesomeIcon icon={faWrench} />
            </Button>
          </Tooltip>
        </HStack>
        <Heading as="h6" size="xs" isTruncated>
          作成日時：{getFormattedDate(catalog.created_at)}
        </Heading>
        {todayFlg ? <Badge colorScheme="amber">New</Badge> : null}
        <Modal isOpen={isOpen} onClose={onClose} size="sm" padding="30px 10px">
          <ModalBody style={{ margin: 'auto' }}>
            <VStack>
              <Input
                defaultValue={name}
                maxLength={20}
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                leftIcon={<FontAwesomeIcon icon={faWrench} />}
                onClick={handleSubmit}
              >
                カタログ名を修正する
              </Button>
            </VStack>
          </ModalBody>
        </Modal>
      </GridItem>
    </Link>
  )
}
export default App
