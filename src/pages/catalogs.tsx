import { Box, Heading, SimpleGrid, useNotice } from '@yamada-ui/react'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AuthContext'
import { fetchCatalogsData } from '@/utils/fetchData'
import type { CatalogData } from '@/types/catalogs'
import { Icon as FontAwesomeIcon } from '@yamada-ui/fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import CatalogItem from '@/components/CatalogItem'
export default function App() {
  const [catalogs, setCatalogs] = useState<CatalogData | null>(null)
  const { isLoggedIn } = useAuth()
  const notice = useNotice({ limit: 1 })
  useEffect(() => {
    if (isLoggedIn) {
      fetchCatalogsData()
        .then((res) => {
          // @ts-expect-error expect CatalogData
          setCatalogs(res)
        })
        .catch((err) => {
          console.error(err)
          notice({
            description: 'データ取得に失敗しました',
            placement: 'bottom-right',
            status: 'error',
          })
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])
  return (
    <Box>
      <Box textAlign="center" marginY={4}>
        <Heading color="primary">
          <FontAwesomeIcon icon={faBook} />
          カタログ一覧
        </Heading>
      </Box>
      <SimpleGrid w="5xl" columns={{ base: 3, md: 1 }} gap="md" margin="auto">
        {catalogs
          ? Object.entries(catalogs).map(([key, catalog]) => (
              <CatalogItem catalog_key={key} catalog={catalog} key={key} />
            ))
          : null}
      </SimpleGrid>
    </Box>
  )
}
