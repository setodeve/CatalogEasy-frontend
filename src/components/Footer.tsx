import { Box, HStack, Link, VStack, Text } from '@yamada-ui/react'

export default function Footer() {
  return (
    <Box
      as="footer"
      background="primary"
      style={{
        left: 0,
        bottom: 0,
        width: '100%',
      }}
    >
      <VStack textAlign="center" fontWeight="bold" color="white">
        <HStack pt="10px" justifyContent="center">
          <Link href="/toc" color="white">
            利用規約
          </Link>
          <Link href="/pp" color="white">
            プライバシーポリシー
          </Link>
        </HStack>
        <Text pb="10px">© CatalogEasy</Text>
      </VStack>
    </Box>
  )
}
