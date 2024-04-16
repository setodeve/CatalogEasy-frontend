import { Box, HStack, Heading, Image } from '@yamada-ui/react'
import type { CSSProperties } from 'react'
export default function Header() {
  const styles: Record<string, CSSProperties> = {
    container: {
      padding: '5px 0 0 0',
      margin: '0 auto',
      width: '100%',
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
      <HStack>
        <Image
          h="60px"
          src="catlogeasy3.png"
          alt="Company Logo"
          className="logo"
          style={{ marginLeft: '20px', color: 'white', filter: 'invert(100%)' }}
        />
        <Heading as="h4" size="md">
          CatalogEasy
        </Heading>
      </HStack>
    </Box>
  )
}
