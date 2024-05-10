import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  useNotice,
  Modal,
  ModalBody,
  useDisclosure,
  Link,
  VStack,
} from '@yamada-ui/react'
import { useRouter } from 'next/router'
import { useRef, useCallback } from 'react'
import {
  faHouse,
  faCircleQuestion,
  faRightToBracket,
  faRightFromBracket,
  faUserPlus,
  faList,
  faPlus,
  faBars,
  faCat,
} from '@fortawesome/free-solid-svg-icons'
import { Icon as FontAwesomeIcon } from '@yamada-ui/fontawesome'
import { useAuth } from '@/components/AuthContext'
import { logout, login } from '@/utils/auth'
import { signoutUserData } from '@/utils/fetchData'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/menubar'
import Usage from '@/components/Usage'
import type { FormEventHandler } from 'react'
import axios from 'axios'
export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useAuth()
  const submitProcessing = useRef(false)
  const router = useRouter()
  const notice = useNotice({ limit: 1 })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useCallback(
    (url: string) => {
      if (submitProcessing.current) return
      submitProcessing.current = true
      router.push(url)
      submitProcessing.current = false
    },
    [router],
  )

  const handleLogin: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault()
    console.log(e.target)
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ENDPOINT + '/auth/sign_in',
        {
          email: process.env.NEXT_PUBLIC_EMAIL,
          password: process.env.NEXT_PUBLIC_PASSWORD,
        },
      )
      login(
        response.headers['uid'],
        response.headers['client'],
        response.headers['access-token'],
      )
      setIsLoggedIn(true)
      router.push('/main')
      notice({
        description: 'ログインに成功しました',
        placement: 'bottom-right',
      })
    } catch (error) {
      notice({
        description: 'ログインに失敗しました',
        placement: 'bottom-right',
        status: 'error',
      })
      console.error('Login error:', error)
    }
  }

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
  const HeaderButton = () => {
    return (
      <HStack>
        <Button
          variant="outline"
          colorScheme="gray"
          bg="gray"
          size="md"
          color="white"
          border="unset"
          onClick={onOpen}
          leftIcon={<FontAwesomeIcon color="white" icon={faCircleQuestion} />}
        >
          使い方を見る
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
          <ModalBody>
            <Usage />
          </ModalBody>
        </Modal>
        {isLoggedIn ? (
          <>
            <Button
              variant="outline"
              colorScheme="primary"
              bg="white"
              size="md"
              onClick={() => navigate('/main')}
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
          </>
        ) : (
          <></>
        )}
      </HStack>
    )
  }
  const SessionButton = () => {
    return isLoggedIn ? (
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
      <HStack>
        <VStack as="form" onSubmit={handleLogin}>
          <Button
            type="submit"
            name="guestlogin"
            variant="outline"
            colorScheme="primary"
            bg="white"
            size="md"
            leftIcon={<FontAwesomeIcon icon={faCat} />}
          >
            Guestでログインする
          </Button>
        </VStack>
        <Button
          variant="outline"
          colorScheme="primary"
          bg="white"
          size="md"
          width="100%"
          onClick={() => navigate('/auth/login')}
          leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}
        >
          ログイン
        </Button>
        <Button
          variant="outline"
          colorScheme="primary"
          bg="white"
          size="md"
          mr="30px"
          width="100%"
          onClick={() => navigate('/auth/signup')}
          leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
        >
          新規登録
        </Button>
      </HStack>
    )
  }

  const MenuBarButton = () => {
    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <FontAwesomeIcon icon={faBars} color="primary" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => navigate('/#usage')}>
              使い方を見る
            </MenubarItem>
            <MenubarSeparator />
            {isLoggedIn ? (
              <>
                <MenubarItem onClick={() => navigate('/main')}>
                  カタログ作成
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={() => navigate('/upload')}>
                  画像登録
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={() => navigate('/catalogs')}>
                  カタログ一覧
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={handleLogout}>ログアウト</MenubarItem>
              </>
            ) : (
              <>
                <MenubarItem onClick={() => navigate('/auth/login')}>
                  ログイン
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={() => navigate('/auth/signup')}>
                  新規登録
                </MenubarItem>
              </>
            )}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  }

  return (
    <Box
      as="header"
      bg="primary"
      style={{
        width: router.pathname === '/main' ? '50%' : '100%',
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
        <Link href="/">
          <HStack>
            <Image
              h="35px"
              src="../catalogcat_white.png"
              alt="Company Logo"
              ml="20px"
            />
            <Heading as="h4" size="md" color="white">
              CatalogEasy
            </Heading>
          </HStack>
        </Link>

        <HStack>
          <HStack _media={[{ maxW: '1400px', css: { display: 'none' } }]}>
            <HeaderButton />
            <SessionButton />
          </HStack>
          <Box _media={[{ minW: '1400px', css: { display: 'none' } }]}>
            <MenuBarButton />
          </Box>
        </HStack>
      </HStack>
    </Box>
  )
}
