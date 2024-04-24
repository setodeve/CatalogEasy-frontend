import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  useNotice,
} from '@yamada-ui/react'
import { useRouter } from 'next/router'
import { useRef, useEffect, useCallback } from 'react'
import {
  faHouse,
  faCircleQuestion,
  faRightToBracket,
  faRightFromBracket,
  faUserPlus,
  faList,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { Icon as FontAwesomeIcon } from '@yamada-ui/fontawesome'
import { useAuth } from '@/components/AuthContext'
import { logout } from '@/utils/auth'
import { signoutUserData } from '@/utils/fetchData'
export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useAuth()
  const submitProcessing = useRef(false)
  const router = useRouter()
  const notice = useNotice({ limit: 1 })
  const navigate = useCallback(
    (url: string) => {
      if (submitProcessing.current) return
      submitProcessing.current = true
      router.push(url)
      submitProcessing.current = false
    },
    [router],
  )

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/login')
    }
  }, [isLoggedIn])

  const handleLogout = async () => {
    if (submitProcessing.current) return
    submitProcessing.current = true

    signoutUserData()
      .then(() => {
        logout()
        setIsLoggedIn(false)
        navigate('/auth/login')
        notice({
          description: 'ログアウトしました',
          placement: 'bottom-right',
        })
      })
      .catch((err) => {
        console.error('Logout error:', err)
        notice({
          description: 'ログアウトに失敗しました',
          placement: 'bottom-right',
          status: 'error',
        })
      })
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
      _media={[{ type: 'print', css: { display: 'none' } }]}
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
          <HStack>
            <Button
              variant="outline"
              colorScheme="gray"
              bg="gray"
              size="md"
              color="white"
              border="unset"
              onClick={() => navigate('/usage#usage')}
              leftIcon={
                <FontAwesomeIcon color="white" icon={faCircleQuestion} />
              }
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
            />
            <Button
              variant="outline"
              colorScheme="primary"
              bg="white"
              size="md"
              onClick={() => navigate('/upload')}
              leftIcon={<FontAwesomeIcon icon={faPlus} />}
            />
            <Button
              variant="outline"
              colorScheme="primary"
              bg="white"
              size="md"
              onClick={() => navigate('/catalogs')}
              leftIcon={<FontAwesomeIcon icon={faList} />}
            />
          </HStack>

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
