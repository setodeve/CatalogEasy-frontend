import { useRouter } from 'next/router'
import { useAuth } from '@/components/AuthContext'
import { fetchCatalogData } from '@/utils/fetchData'
import { useEffect, useState } from 'react'
import ConfirmForm from '@/components/ConfirmForm'
import { Button, VStack, Flex, Loading } from '@yamada-ui/react'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { Icon as FontAwesomeIcon } from '@yamada-ui/fontawesome'

export default function Page() {
  const router = useRouter()
  const [catalog, setCatalog] = useState(null)
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    if (isLoggedIn && router.query.slug)
      fetchCatalogData(router.query.slug)
        .then((res) => {
          setCatalog(res)
        })
        .catch((err) => {
          console.error(err)
        })
  }, [isLoggedIn, router.query.slug])

  return (
    <>
      <VStack
        _media={[{ type: 'print', css: { display: 'none' } }]}
        style={{
          width: '300px',
          zIndex: 1,
          margin: '0 auto 10px auto',
        }}
        position="sticky"
        top="20"
      >
        <Button
          leftIcon={<FontAwesomeIcon icon={faPrint} />}
          colorScheme="primary"
          margin="10px auto"
          padding="10px"
          onClick={() => window.print()}
        >
          印刷 または PDF出力する
        </Button>
      </VStack>
      <Flex justify="center" align="center" direction="column">
        {catalog ? (
          <ConfirmForm productInfo={catalog} />
        ) : (
          <Loading
            variant="rings"
            size="9xl"
            color="blue.500"
            style={{ margin: '30% 50%' }}
          />
        )}
      </Flex>
    </>
  )
}
