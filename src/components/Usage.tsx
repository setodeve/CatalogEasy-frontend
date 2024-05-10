import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/Carousel'
import { Image, Heading, Box } from '@yamada-ui/react'
export default function App() {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      style={{ width: '90%', margin: '0 auto' }}
    >
      <CarouselContent>
        <CarouselItem>
          <Heading
            as="h4"
            size="md"
            margin="10px auto"
            color="primary.600"
            isTruncated
          >
            1/5 画像を登録しよう
          </Heading>
          <Box display="flex">
            <Box>
              商品画像を登録するため、画面のプラスボタンを押してください。
              <Image src="../plus_header.png" alt="plus_header" w="50%" />
              <br />
              商品画像を選択して、登録予定の画像に認識まちがいないか確認したら、
              <br />
              アップロードボタンを押してください。
              <br />
              <Image src="../upload_image.gif" alt="plus_header" w="100%" />
              <br />
            </Box>
          </Box>
        </CarouselItem>
        <CarouselItem>
          <Heading
            as="h4"
            size="md"
            margin="10px auto"
            isTruncated
            color="primary.600"
          >
            2/5 商品情報を入力しよう
          </Heading>
          <Box display="flex">
            <Box>
              商品情報を登録するため、画面の家ボタンを押してください。
              <Image
                src="../product_header.png"
                alt="product_header"
                w="50%"
                alignItems="center"
              />
              <br />
              商品ごとに製品名、サイズ、卸価格、小売価格、備考の情報を登録できます。
              <Image src="../enter_info.gif" alt="plus_header" w="100%" />
              <br />
              以下のようなCSV形式の商品データがある場合、
              <br />
              「CSVからインポート」ボタンを押すことで一括で商品情報を入力することができます
              <Image src="../import_csv.png" alt="plus_header" w="40%" />
              <br />
            </Box>
          </Box>
        </CarouselItem>
        <CarouselItem>
          <Heading
            as="h4"
            size="md"
            margin="10px auto"
            isTruncated
            color="primary.600"
          >
            3/5 画像と商品情報を登録しよう
          </Heading>
          <Box>
            <Box>
              入力した商品情報と登録した画像を紐づけるために、
              <br />
              右側の画像を左側の任意の商品にドラッグ&ドロップしてください。
              <br />
              <Image src="../drag_image.gif" alt="drag_image" w="100%" />
            </Box>
          </Box>
        </CarouselItem>
        <CarouselItem>
          <Heading
            as="h4"
            size="md"
            margin="10px auto"
            isTruncated
            color="primary.600"
          >
            4/5 印刷のイメージを確認しよう
          </Heading>
          <Box display="flex">
            <Box>
              商品情報と商品写真が紐づいた内容に認識間違いがないことを確認するために、「確認する」ボタンを押してください。
              <br />
              どのように印刷されるかのイメージを確認できます。
              <br />
              ここで問題がなければ、「問題なし」ボタンを押すことでカタログを作成することができます。
              <br />
              <Image src="../confirm.gif" alt="plus_header" w="100%" />
            </Box>
          </Box>
        </CarouselItem>
        <CarouselItem>
          <Heading
            as="h4"
            size="md"
            margin="10px auto"
            isTruncated
            color="primary.600"
          >
            5/5 カタログ完成!
          </Heading>
          <Box display="flex">
            <Box>
              「リスト」ボタンを押すことで作成したカタログ一覧の確認ができます。
              <Image src="../list_header.png" alt="plus_header" w="50%" />
              <br />
              カタログ一覧からそれぞれのカタログを確認や印刷,PDF化することができます。
              <Image src="../catalog.gif" alt="plus_header" w="100%" />
            </Box>
          </Box>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="bg-blue-500 text-white" />
      <CarouselNext className="bg-blue-500 text-white" />
    </Carousel>
  )
}
