import { Box, Button, HStack, Heading, Image } from '@yamada-ui/react'
import { useRouter } from 'next/router'
import type { CSSProperties, MouseEventHandler } from 'react'
import { useRef } from 'react'
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
  const submitForm: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (submitProcessing.current) return
    submitProcessing.current = true
    try {
      const data = {
        uid: Cookies.get('uid'),
        client: Cookies.get('client'),
        'access-token': Cookies.get('access-token'),
      }
      const response = await axios.delete(
        'http://localhost:8080/api/auth/sign_out',
        {
          headers: {},
          data,
        },
      )
      logout()
      setIsLoggedIn(false)
      router.push('/auth/login')
      console.log('Logout success:', response)
    } catch (error) {
      console.error('Logout error:', error)
    }

    submitProcessing.current = false
  }

  const authButton = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    url: string,
  ) => {
    event.preventDefault()
    event.stopPropagation()

    if (submitProcessing.current) return
    submitProcessing.current = true
    router.push(url)
    submitProcessing.current = false
  }

  const styles: Record<string, CSSProperties> = {
    container: {
      padding: '5px 0 0 0',
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
      <HStack
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
        }}
      >
        <HStack>
          <Image
            h="35px"
            src="../catalogcat_white.png"
            alt="Company Logo"
            className="logo"
            style={{
              marginLeft: '20px',
            }}
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
            onClick={(e) => {
              authButton(e, '/')
            }}
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
              style={{ margin: '0 30px 0 0' }}
              onClick={(e) => {
                submitForm(e)
              }}
              leftIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
            >
              ログアウト
            </Button>
          ) : router.pathname === '/auth/signup' ? (
            <Button
              variant="outline"
              colorScheme="primary"
              bg="white"
              size="md"
              style={{ margin: '0 30px 0 0' }}
              onClick={(e) => {
                authButton(e, '/auth/login')
              }}
              leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}
            >
              ログイン
            </Button>
          ) : router.pathname === '/auth/login' ? (
            <Button
              variant="outline"
              colorScheme="primary"
              bg="white"
              size="md"
              style={{ margin: '0 30px 0 0' }}
              onClick={(e) => {
                authButton(e, '/auth/signup')
              }}
              leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
            >
              新規登録
            </Button>
          ) : null}
        </HStack>
      </HStack>
    </Box>
  )
}
