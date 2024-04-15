import ConfirmForm from '@/components/ConfirmForm'
import { faCheck, faWrench } from '@fortawesome/free-solid-svg-icons'
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
        size="2xl"
        style={{
          backgroundColor: '#7bc0f9',
          padding: '10px',
          color: 'white',
          cursor: 'pointer',
        }}
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
        <ModalBody>
          <ConfirmForm productInfo={productInfo} />
        </ModalBody>
      </Modal>
    </>
  )
}
