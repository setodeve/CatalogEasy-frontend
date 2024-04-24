import ConfirmForm from '@/components/ConfirmForm'
import type { ProductData } from '@/types/product'
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
} from '@yamada-ui/react'
import { useAuth } from '@/components/AuthContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Catalog({ productInfo }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const notice = useNotice({ limit: 1 })

  useEffect(() => {
    if (isLoggedIn == false) {
      router.push('/auth/login')
    }
  }, [isLoggedIn, router])

  const onSubmit = (data: ProductData) => {
    uploadProductData({ products: data })
      .then((res) => {
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
  }

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
      >
        確認する
      </Button>

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
