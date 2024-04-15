import ConfirmForm from '@/components/ConfirmForm'
import {
  faCheck,
  faCircleCheck,
  faWrench,
} from '@fortawesome/free-solid-svg-icons'
import { Icon as FontAwesomeIcon } from '@yamada-ui/fontawesome'
import {
  Button,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from '@yamada-ui/react'
export default function Catalog({ productInfo }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  if (productInfo == null) {
    return null
  }

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="sky"
        size="xl"
        style={{
          padding: '10px',
        }}
        leftIcon={<FontAwesomeIcon icon={faCircleCheck} />}
      >
        確認する
      </Button>

      <Modal isOpen={isOpen} size="full" bg="blackAlpha.500">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalHeader style={{ margin: 'auto' }}>
          <VStack>
            <Heading as="h4" size="md" color="white" isTruncated>
              以下は印刷時のイメージです。問題ないこと確認してください。
            </Heading>
            <HStack style={{ margin: 'auto' }}>
              <Button
                onClick={onClose}
                leftIcon={<FontAwesomeIcon icon={faWrench} />}
              >
                修正する
              </Button>
              <Button
                colorScheme="sky"
                rightIcon={<FontAwesomeIcon icon={faCheck} />}
              >
                問題なし
              </Button>
            </HStack>
          </VStack>
        </ModalHeader>
        <ModalBody style={{ backgroundColor: 'inherit' }}>
          <ConfirmForm productInfo={productInfo} />
        </ModalBody>
      </Modal>
    </>
  )
}
