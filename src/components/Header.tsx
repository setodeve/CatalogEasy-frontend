import { Box, Button, HStack, Heading, Image } from '@yamada-ui/react'
import { useRouter } from 'next/router'
import { useRef, useCallback } from 'react'
import {
  faHouse,
  faCircleQuestion,
  faRightToBracket,
  faRightFromBracket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import { Icon as FontAwesomeIcon } from '@yamada-ui/fontawesome'
import { useAuth } from '@/components/AuthContext'
import { logout } from '@/utils/auth'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useAuth()
  const submitProcessing = useRef(false)
  const router = useRouter()

  const navigate = useCallback(
    (url: string) => {
      if (submitProcessing.current) return
      submitProcessing.current = true
      router.push(url)
      submitProcessing.current = false
    },
    [router],
  )

  const handleLogout = async () => {
    if (submitProcessing.current) return
    submitProcessing.current = true
    try {
      const data = {
        uid: Cookies.get('uid'),
        client: Cookies.get('client'),
        'access-token': Cookies.get('access-token'),
      }
      await axios.delete('http://localhost:8080/api/auth/sign_out', { data })
      logout()
      setIsLoggedIn(false)
      navigate('/auth/login')
      console.log('Logout success')
    } catch (error) {
      console.error('Logout error:', error)
    }
    submitProcessing.current = false
  }

  return (
    <Box
      as="header"
      bg="primary"
      style={{
        width: router.pathname === '/' ? '50%' : '100%',
        padding: '5px 0',
        height: '70px',
        display: 'fixed',
        color: 'white',
        zIndex: 1,
        position: 'sticky',
      }}
    >
      <HStack justifyContent="space-between" mt="10px">
        <HStack>
          <Image
            h="35px"
            src="../catalogcat_white.png"
            alt="Company Logo"
            ml="20px"
          />
          <Heading as="h4" size="md">
            CatalogEasy
          </Heading>
        </HStack>
        <HStack>
          <Button
            variant="outline"
            colorScheme="gray"
            bg="gray"
            size="md"
            color="white"
            border="unset"
            leftIcon={<FontAwesomeIcon color="white" icon={faCircleQuestion} />}
          >
            使い方を見る
          </Button>
          <Button
            variant="outline"
            colorScheme="primary"
            bg="white"
            size="md"
            onClick={() => navigate('/')}
            leftIcon={<FontAwesomeIcon icon={faHouse} />}
          >
            ホーム
          </Button>
          {isLoggedIn ? (
            <Button
              variant="outline"
              colorScheme="primary"
              bg="white"
              size="md"
              mr="30px"
              onClick={handleLogout}
              leftIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
            >
              ログアウト
            </Button>
          ) : (
            <Button
              variant="outline"
              colorScheme="primary"
              bg="white"
              size="md"
              mr="30px"
              onClick={() =>
                navigate(
                  router.pathname === '/auth/signup'
                    ? '/auth/login'
                    : '/auth/signup',
                )
              }
              leftIcon={
                router.pathname === '/auth/login' ? (
                  <FontAwesomeIcon icon={faUserPlus} />
                ) : (
                  <FontAwesomeIcon icon={faRightToBracket} />
                )
              }
            >
              {router.pathname === '/auth/login' ? '新規登録' : 'ログイン'}
            </Button>
          )}
        </HStack>
      </HStack>
    </Box>
  )
}
