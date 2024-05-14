import React, { useState, useEffect } from 'react'
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from '@/components/TimeLine'
import { Image, Heading, Box, SimpleGrid, GridItem } from '@yamada-ui/react'

export default function App() {
  const [browserName, setBrowserName] = useState('Unknown')

  useEffect(() => {
    const userAgent = navigator.userAgent
    // @ts-expect-error expect browserName
    if (navigator.brave) {
      setBrowserName('Safari')
    } else if (userAgent.includes('Chrome')) {
      setBrowserName('Chrome')
    } else if (userAgent.includes('Firefox')) {
      setBrowserName('Firefox')
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      setBrowserName('Safari')
    } else if (userAgent.includes('Edge')) {
      setBrowserName('Edge')
    }
  }, [])

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
          CatalogEasyとは?
        </Heading>
        <Box textAlign="center">
          <Box fontSize="xl" wordBreak="break-word">
            商品の画像付きのカタログを作りたいが難しい操作をしたくない！という方へ向けたカタログ作成アプリです。
            <br />
            <br />
            商品データと商品画像を登録することで簡単にカタログ作成ができます。
          </Box>
          <Image
            src="../app_image.png"
            alt="app_image"
            margin="30px auto"
            w="45%"
            bg="white"
            style={{
              padding: '50px',
              borderRadius: '10px',
              border: '0.2rem solid',
              borderColor: '#2563eb',
            }}
            _media={[{ maxW: '1400px', css: { w: '60%' } }]}
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
          columns={{ base: 2, xl: 1 }}
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
            <Image
              src="../person1.png"
              alt="person"
              w={browserName == 'Chrome' ? '68px' : '135px'}
              margin="0 auto"
            />
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
            <Image
              src="../person2.png"
              alt="person"
              w={browserName == 'Chrome' ? '70px' : '139px'}
              margin="0 auto"
            />
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
              <Image src="../plus_header.png" alt="plus_header" w="50%" />
              <br />
              商品画像を選択して、登録予定の画像に認識まちがいないか確認したら、
              <br />
              アップロードボタンを押してください。
              <br />
              <Image src="../upload_image.gif" alt="plus_header" />
              <br />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="done">
            <TimelineHeading>商品情報を入力しよう</TimelineHeading>
            <TimelineDot status="current" num="2" />
            <TimelineLine done />
            <TimelineContent>
              商品情報を登録するため、画面の家ボタンを押してください。
              <Image src="../product_header.png" alt="product_header" w="50%" />
              <br />
              商品ごとに製品名、サイズ、卸価格、小売価格、備考の情報を登録できます。
              <br />
              <Image src="../enter_info.gif" alt="plus_header" />
              <br />
              以下のようなCSV形式の商品データがある場合、
              <br />
              「CSVからインポート」ボタンを押すことで一括で商品情報を入力することができます
              <Image src="../import_csv.png" alt="plus_header" w="40%" />
              <br />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="done">
            <TimelineHeading>画像と商品情報を登録しよう</TimelineHeading>
            <TimelineDot status="current" num="3" />
            <TimelineLine done />
            <TimelineContent>
              入力した商品情報と登録した画像を紐づけるために、
              <br />
              右側の画像を左側の任意の商品にドラッグ&ドロップしてください。
              <br />
              <Image src="../drag_image.gif" alt="drag_image" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="done">
            <TimelineHeading>印刷のイメージを確認しよう</TimelineHeading>
            <TimelineDot status="current" num="4" />
            <TimelineLine done />
            <TimelineContent>
              商品情報と商品写真が紐づいた内容に認識間違いがないことを確認するために、「確認する」ボタンを押してください。
              <br />
              どのように印刷されるかのイメージを確認できます。
              <br />
              ここで問題がなければ、「問題なし」ボタンを押すことでカタログを作成することができます。
              <br />
              <Image src="../confirm.gif" alt="plus_header" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem status="done">
            <TimelineHeading>カタログ完成!</TimelineHeading>
            <TimelineDot status="current" num="5" />
            <TimelineLine done />
            <TimelineContent>
              「リスト」ボタンを押すことで作成したカタログ一覧の確認ができます。
              <Image src="../list_header.png" alt="plus_header" w="50%" />
              <br />
              カタログ一覧からそれぞれのカタログを確認や印刷,PDF化することができます。
              <Image src="../catalog.gif" alt="plus_header" />
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Box>
    </Box>
  )
}
