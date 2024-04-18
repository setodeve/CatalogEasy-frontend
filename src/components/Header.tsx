import { Box, Button, HStack, Heading, Image } from '@yamada-ui/react'
import { useRouter } from 'next/router'
import type { CSSProperties } from 'react'

export default function Header() {
  const router = useRouter()
  const styles: Record<string, CSSProperties> = {
    container: {
      padding: '5px 0 0 0',
      // margin: '0 auto',
      width: router.pathname === '/' ? '50%' : '100%',
      height: '70px',
      display: 'fixed',
      color: 'white',
      zIndex: 1,
      position: 'sticky',
    },
  }

  return (
    <Box
      as="header"
      bg="primary"
      style={styles.container}
      _media={[{ type: 'print', css: { display: 'none' } }]}
    >
      <HStack style={{ display: 'flex', justifyContent: 'space-between' }}>
        <HStack>
          <Image
            h="60px"
            src="catlogeasy3.png"
            alt="Company Logo"
            className="logo"
            style={{
              marginLeft: '20px',
              color: 'white',
              filter: 'invert(100%)',
            }}
          />
          <Heading as="h4" size="md">
            CatalogEasy
          </Heading>
        </HStack>
        <Button
          variant="outline"
          colorScheme="primary"
          bg="white"
          style={{ margin: '0 50px' }}
        >
          ログアウト
        </Button>
      </HStack>
    </Box>
  )
}
