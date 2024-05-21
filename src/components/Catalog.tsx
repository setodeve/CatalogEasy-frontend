import ConfirmForm from '@/components/ConfirmForm'
import type { ProductsData } from '@/types/product'
import { uploadProductData } from '@/utils/fetchData'
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
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
  useNotice,
  IconButton,
} from '@yamada-ui/react'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

export default function Catalog({
  productInfo,
}: {
  productInfo: ProductsData[]
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const notice = useNotice({ limit: 1 })

  const onSubmit = useCallback(
    async (data: ProductsData[]): Promise<void> => {
      uploadProductData({ products: data })
        .then(() => {
          notice({
            description: 'カタログ作成しました',
            placement: 'bottom-right',
          })
          onClose()
          router.push('/catalogs')
        })
        .catch((err) => {
          console.error(err)
          notice({
            description: 'カタログ作成に失敗しました',
            placement: 'bottom-right',
            status: 'error',
          })
        })
    },
    [notice, router, onClose],
  )

  if (productInfo == null) {
    return null
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
        leftIcon={<FontAwesomeIcon icon={faCircleCheck} />}
        _media={[{ maxW: '850px', css: { display: 'none' } }]}
      >
        確認する
      </Button>
      <IconButton
        onClick={onOpen}
        colorScheme="primary"
        icon={<FontAwesomeIcon icon={faCircleCheck} />}
        _media={[{ minW: '850px', css: { display: 'none' } }]}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalCloseButton style={{ opacity: 0 }} isDisabled />
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalHeader
          style={{ margin: 'auto' }}
          _media={[{ type: 'print', css: { display: 'none' } }]}
        >
          <VStack _media={[{ type: 'print', css: { display: 'none' } }]}>
            <Heading as="h4" size="md" isTruncated>
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
                onClick={() => onSubmit(productInfo)}
                colorScheme="primary"
                rightIcon={<FontAwesomeIcon icon={faCheck} />}
              >
                問題なし
              </Button>
            </HStack>
          </VStack>
        </ModalHeader>
        <ModalBody
          style={{
            backgroundColor: 'inherit',
            margin: 'auto',
          }}
        >
          <ConfirmForm productInfo={productInfo} />
        </ModalBody>
      </Modal>
    </>
  )
}
