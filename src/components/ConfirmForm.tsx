import { splitArrayIntoChunksOfSix } from '@/utils/productInfo'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@yamada-ui/fontawesome'
import {
  Textarea,
  GridItem,
  Grid,
  HStack,
  Image,
  Input,
  VStack,
} from '@yamada-ui/react'
import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { ProductsData } from '@/types/product'

export default function ConfirmForm({
  productInfo,
}: {
  productInfo: ProductsData[]
}) {
  const [retailShow, setRetailShow] = useState(true)
  const [tradeShow, setTradeShow] = useState(true)

  const retailCheckboxChange = () => {
    setRetailShow(!retailShow)
  }

  const tradeCheckboxChange = () => {
    setTradeShow(!tradeShow)
  }
  return (
    <>
      {/* TODO 別のcssの当て方がないか検討する*/}
      <style>
        {`
        .printCatalog {
            width: 50%;
          }
        @media print {
          .printCatalog {
            width: 100%;
          }
        }`}
      </style>
      <HStack>
        <label>
          <input
            type="checkbox"
            checked={tradeShow}
            onChange={tradeCheckboxChange}
          />
          卸価格表示
        </label>
        <label>
          <input
            type="checkbox"
            checked={retailShow}
            onChange={retailCheckboxChange}
          />
          小売価格表示
        </label>
      </HStack>
      <VStack className="printCatalog">
        {splitArrayIntoChunksOfSix(productInfo).map((chunk, chunkIndex) => {
          return (
            <Grid
              key={`chunk-${chunkIndex}`}
              className="page"
              templateColumns="repeat(3, 1fr)"
              gap="sm"
            >
              {chunk.map((f: ProductsData, fieldIndex: number) => {
                const absoluteIndex = chunkIndex * 6 + fieldIndex
                return (
                  <GridItem key={absoluteIndex} w="full" h="4xs">
                    <h5>{`No.${absoluteIndex + 1}`}</h5>
                    <VStack className="section">
                      <VStack style={styles.image}>
                        {f.image ? (
                          <Image
                            src={f.image}
                            alt="商品画像"
                            style={styles.image}
                          />
                        ) : (
                          <VStack style={styles.imageContainer}>
                            <Icon
                              icon={faImage}
                              size="xl"
                              style={styles.noImage}
                            />
                          </VStack>
                        )}
                      </VStack>
                      <VStack>
                        <Input
                          variant="unstyled"
                          isDisabled
                          size="sm"
                          defaultValue={f.name}
                          style={{ opacity: 1 }}
                        />
                        <Input
                          variant="unstyled"
                          isDisabled
                          size="sm"
                          defaultValue={f.size}
                          style={{ opacity: 1 }}
                        />
                      </VStack>
                      <HStack>
                        {tradeShow ? (
                          <Input
                            variant="unstyled"
                            isDisabled
                            placeholder="卸価格"
                            type="number"
                            size="xs"
                            defaultValue={f.trade_price}
                            style={{ opacity: 1 }}
                          />
                        ) : null}
                        {retailShow ? (
                          <Input
                            variant="unstyled"
                            isDisabled
                            placeholder="小売価格"
                            type="number"
                            size="xs"
                            defaultValue={f.retail_price}
                            style={{ opacity: 1 }}
                          />
                        ) : null}
                      </HStack>
                      <Textarea
                        variant="unstyled"
                        isDisabled
                        defaultValue={f.remark}
                        size="xs"
                        style={{ opacity: 1 }}
                      />
                    </VStack>
                  </GridItem>
                )
              })}
            </Grid>
          )
        })}
      </VStack>
    </>
  )
}

const styles: Record<string, CSSProperties> = {
  container: {
    margin: '0 auto',
  },
  imageContainer: {
    width: '200px',
    height: '200px',
    border: '1px dotted gray',
    display: 'flex',
    backgroundColor: 'lightgray',
    borderRadius: '15px',
  },
  image: {
    width: '220px',
    height: '220px',
    paddingTop: '(3 / 4 * 100%)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    objectFit: 'contain',
  },
  noImage: {
    position: 'relative',
    margin: 'auto',
    color: 'gray',
  },
}
