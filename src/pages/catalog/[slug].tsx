import { useRouter } from 'next/router'
import { useAuth } from '@/components/AuthContext'
import { fetchCatalogData } from '@/utils/fetchData'
import { useEffect, useState } from 'react'
import ConfirmForm from '@/components/ConfirmForm'
import { Button, VStack, Flex, Loading } from '@yamada-ui/react'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { Icon as FontAwesomeIcon } from '@yamada-ui/fontawesome'
// import jsPDF from 'jspdf'
// import html2canvas from 'html2canvas'

export default function Page() {
  const router = useRouter()
  const [catalog, setCatalog] = useState<any>(null)
  const { isLoggedIn } = useAuth()
  // const exportPDF = () => {
  //   html2canvas(document.body).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png')
  //     const pdf = new jsPDF()
  //     pdf.addImage(imgData, 'PNG', 0, 0)
  //     pdf.save('download.pdf')
  //   })
  // }

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
    <>
      <VStack
        _media={[{ type: 'print', css: { display: 'none' } }]}
        style={{
          width: '300px',
          zIndex: 1,
          margin: '0 auto 10px auto',
        }}
        position="sticky"
        top="20"
      >
        <Button
          leftIcon={<FontAwesomeIcon icon={faPrint} />}
          colorScheme="primary"
          style={{
            padding: '10px',
          }}
          onClick={() => window.print()}
        >
          印刷 または PDF出力する
        </Button>
        {/* <Button
          leftIcon={<FontAwesomeIcon icon={faFilePdf} />}
          colorScheme="primary"
          style={{
            padding: '10px',
          }}
          onClick={() => exportPDF()}
        >
          PDF
        </Button> */}
      </VStack>
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
    </>
  )
}
