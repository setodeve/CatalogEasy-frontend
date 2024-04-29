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
import type { CSSProperties } from 'react'
import type { ProductInfo } from '@/types/product'

export default function ConfirmForm({
  productInfo,
}: {
  productInfo: ProductInfo[]
}) {
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
      <VStack className="printCatalog">
        {splitArrayIntoChunksOfSix(productInfo).map((chunk, chunkIndex) => {
          return (
            <Grid
              key={`chunk-${chunkIndex}`}
              className="page"
              templateColumns="repeat(3, 1fr)"
              gap="sm"
            >
              {chunk.map((f: ProductInfo, fieldIndex: number) => {
                const absoluteIndex = chunkIndex * 6 + fieldIndex
                return (
                  <GridItem
                    key={absoluteIndex}
                    // style={{ marginTop: '20px' }}
                    w="full"
                    h="4xs"
                  >
                    <h5>{`No.${absoluteIndex + 1}`}</h5>
                    <VStack className="section">
                      <VStack style={styles.image}>
                        {f.image ? (
                          <Image
                            src={f.image}
                            alt="Dropped content"
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
                        <Input
                          variant="unstyled"
                          isDisabled
                          placeholder="trade_price"
                          type="number"
                          size="xs"
                          defaultValue={f.trade_price}
                          style={{ opacity: 1 }}
                        />
                        <Input
                          variant="unstyled"
                          isDisabled
                          placeholder="retail_price"
                          type="number"
                          size="xs"
                          defaultValue={f.retail_price}
                          style={{ opacity: 1 }}
                        />
                      </HStack>
                      <Textarea
                        variant="unstyled"
                        isDisabled
                        defaultValue={f.remark}
                        size="sm"
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
    // margin: 'auto',
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
