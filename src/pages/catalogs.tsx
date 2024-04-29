import {
  Box,
  Heading,
  Link,
  SimpleGrid,
  GridItem,
  useNotice,
} from '@yamada-ui/react'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AuthContext'
import { fetchCatalogsData } from '@/utils/fetchData'
import type { CatalogData } from '@/types/catalogs'
import { Icon as FontAwesomeIcon } from '@yamada-ui/fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

export default function App() {
  const [catalogs, setCatalogs] = useState<CatalogData | null>(null)
  const { isLoggedIn } = useAuth()
  const getFormattedDate = (date: string): string =>
    new Date(Date.parse(date)).toLocaleString()
  const notice = useNotice({ limit: 1 })
  useEffect(() => {
    if (isLoggedIn) {
      fetchCatalogsData()
        .then((res) => {
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

      <SimpleGrid w="5xl" columns={{ base: 2, md: 1 }} gap="md" margin="auto">
        {catalogs
          ? Object.entries(catalogs).map(([key, catalog]) => (
              <Link href={`/catalog/${key}`} key={key}>
                <GridItem
                  h="4xs"
                  rounded="md"
                  bg="primary"
                  padding={2}
                  color="white"
                >
                  <Heading as="h5" size="md" isTruncated>
                    {catalog.name}
                  </Heading>
                  <Heading as="h6" size="xs" isTruncated>
                    作成日時：{getFormattedDate(catalog.created_at)}
                  </Heading>
                </GridItem>
              </Link>
            ))
          : null}
      </SimpleGrid>
    </Box>
  )
}
