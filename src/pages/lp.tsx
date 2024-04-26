import React from 'react'

import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from '@/components/TimeLine'
import {
  Image,
  Link,
  Heading,
  Box,
  Text,
  SimpleGrid,
  GridItem,
} from '@yamada-ui/react'
export default function App() {
  return (
    <Box>
      <Box padding="50px 0">
        <Heading
          as="h2"
          size="2xl"
          id="about"
          color="#2563eb"
          margin="0 auto 50px auto"
          textAlign="center"
        >
          CatlogEasyとは?
        </Heading>
        <Box textAlign="center">
          <Text fontSize="xl" isTruncated>
            主に陶器(日用品を含む)の画像付きのカタログを作りたいが難しい操作をしたくない！という方向けのカタログ作成アプリです。
            <br />
            商品データと商品画像を登録することで簡単にカタログ作成ができます。
          </Text>
          <Image
            src="app_image.png"
            alt="app_image"
            margin="30px auto"
            w="40%"
            bg="white"
            // style={{
            //   padding: '50px',
            //   borderRadius: '10px',
            //   border: '0.2rem solid',
            //   borderColor: '#2563eb',
            // }}
          />
        </Box>
      </Box>

      <Box bg="#d3e0fb" padding="50px 0">
        <Heading
          as="h2"
          size="2xl"
          id="enable"
          color="#2563eb"
          margin="0 auto 50px auto"
          textAlign="center"
        >
          こんな困り事ありませんか?
        </Heading>
        <SimpleGrid
          w="4xl"
          _media={[{ maxW: '768px', css: { w: 'xl' } }]}
          columns={{ base: 2, md: 1 }}
          gap="xl"
          margin="20px auto"
        >
          <GridItem
            w="md"
            h="xs"
            rounded="md"
            bg="white"
            border="0.2rem solid"
            borderColor="#2563eb"
            margin="auto"
          >
            <Heading
              as="h4"
              size="md"
              color="#2563eb"
              textAlign="center"
              margin="10px"
            >
              お客様に商品をまとめた資料を出したいけど難しいツールは使えない。。
            </Heading>
            <Image src="person1.png" alt="person" w="135px" margin="0 auto" />
          </GridItem>
          <GridItem
            w="md"
            h="xs"
            rounded="md"
            bg="white"
            border="0.2rem solid"
            borderColor="#2563eb"
            margin="auto"
          >
            <Heading
              as="h4"
              size="md"
              color="#2563eb"
              textAlign="center"
              margin="10px"
            >
              商品データと商品画像あるけど扱いに困っている。。
            </Heading>
            <Image src="person2.png" alt="person" w="139px" margin="0 auto" />
          </GridItem>
        </SimpleGrid>
      </Box>

      <Box bg="#f1f5fe" padding="50px 0">
        <Heading
          as="h2"
          size="2xl"
          id="usage"
          color="#2563eb"
          margin="0 auto 50px auto"
          textAlign="center"
        >
          使い方
        </Heading>
        <Timeline
          style={{
            width: '80%',
            margin: '0 auto',
            background: 'white',
            borderRadius: '10px',
            padding: '50px',
            border: '0.2rem solid',
            borderColor: '#2563eb',
          }}
        >
          <TimelineItem status="done">
            <TimelineHeading>画像を登録しよう</TimelineHeading>
            <TimelineDot status="current" num="1" />
            <TimelineLine done />
            <TimelineContent>
              商品画像を登録するため、画面のプラスボタンを押してください。
              <Image src="plus_header.png" alt="plus_header" w="50%" />
              商品画像を選択して、登録予定の画像に認識まちがいないか確認したら、
              <br />
              アップロードボタンを押してください。
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="done">
            <TimelineHeading side="right">商品情報を入力しよう</TimelineHeading>
            <TimelineDot status="current" num="2" />
            <TimelineLine done />
            <TimelineContent>
              商品情報を入力するため、画面の家ボタンを押してください。
              <Image src="product_header.png" alt="plus_header" w="50%" />
              商品ごとに製品名、サイズ、卸価格、小売価格、備考の情報を登録できます。
              画像
              以下のようなCSV形式のデータがある場合一括で商品情報を入力することができます
              画像
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="done">
            <TimelineHeading>画像と商品情報を登録しよう</TimelineHeading>
            <TimelineDot status="current" num="3" />
            <TimelineLine done />
            <TimelineContent>
              入力した商品情報と登録した画像を紐づけるために、右側の画像を左側の任意の商品にドラッグ&ドロップしてください。
              <br />
              <Link
                href="https://flets-w.com/chienetta/pc_mobile/cb_pc-operate65.html"
                isExternal
              >
                ※ドラッグ&ドロップがわからない方はこちらをクリック
              </Link>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="done">
            <TimelineHeading>印刷のイメージを確認しよう</TimelineHeading>
            <TimelineDot status="current" num="4" />
            <TimelineLine done />
            <TimelineContent>
              商品情報と商品写真が紐づいた内容に認識間違いがないことを確認するために、「確認する」ボタンを押してください。
              どのように印刷されるかのイメージを確認できます。
              ここで問題がなければ、「問題なし」ボタンを押すことでカタログを作成することができます。
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="done">
            <TimelineHeading>カタログ完成!</TimelineHeading>
            <TimelineDot status="current" num="5" />
            <TimelineContent>
              「リスト」ボタンを押すことで作成したカタログ一覧の確認ができます。
              <Image src="list_header.png" alt="plus_header" w="50%" />
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Box>
    </Box>
  )
}
