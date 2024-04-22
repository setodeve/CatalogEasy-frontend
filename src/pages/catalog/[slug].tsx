import { useRouter } from 'next/router'
import { useAuth } from '@/components/AuthContext'
import { fetchCatalogData } from '@/utils/fetchData'
import { useEffect, useState } from 'react'
import ConfirmForm from '@/components/ConfirmForm'
import { Flex, Loading } from '@yamada-ui/react'

export default function Page() {
  const router = useRouter()
  const [catalog, setCatalog] = useState<any>(null)
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
  )
}
