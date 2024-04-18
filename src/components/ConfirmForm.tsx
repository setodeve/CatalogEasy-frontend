import { splitArrayIntoChunksOfTwo } from '@/utils/productInfo'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@yamada-ui/fontawesome'
import { Box, HStack, Image, Input, VStack } from '@yamada-ui/react'
import type { CSSProperties } from 'react'

export default function ConfirmForm({ productInfo }) {
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
      <VStack className="printCatalog" style={{}}>
        {splitArrayIntoChunksOfTwo(productInfo).map((chunk, chunkIndex) => {
          return (
            <Box key={`chunk-${chunkIndex}`} className="page">
              {chunk.map((f: any, fieldIndex: number) => {
                const absoluteIndex = chunkIndex * 2 + fieldIndex
                return (
                  <VStack key={absoluteIndex} style={{ marginTop: '20px' }}>
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
                              size="6xl"
                              style={styles.noImage}
                            />
                          </VStack>
                        )}
                      </VStack>
                      <HStack>
                        <Input
                          variant="unstyled"
                          isDisabled
                          // placeholder="name"
                          defaultValue={f.name}
                          style={{ opacity: 1 }}
                        />
                        <Input
                          variant="unstyled"
                          isDisabled
                          // placeholder="size"
                          defaultValue={f.size}
                          style={{ opacity: 1 }}
                        />
                      </HStack>
                      <HStack>
                        <Input
                          variant="unstyled"
                          isDisabled
                          placeholder="trade_price"
                          type="number"
                          defaultValue={f.trade_price}
                          style={{ opacity: 1 }}
                        />
                        <Input
                          variant="unstyled"
                          isDisabled
                          placeholder="retail_price"
                          type="number"
                          defaultValue={f.retail_price}
                          style={{ opacity: 1 }}
                        />
                      </HStack>
                      <Input
                        variant="unstyled"
                        isDisabled
                        // placeholder="remark"
                        defaultValue={f.remark}
                        style={{ opacity: 1 }}
                      />
                    </VStack>
                  </VStack>
                )
              })}
            </Box>
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
  delete: {
    cursor: 'pointer',
    border: 'none',
    marginLeft: '650px',
    gap: '0px',
    color: 'red',
  },
  imageContainer: {
    margin: 'auto',
    width: '260px',
    height: '260px',
    border: '1px dotted gray',
    display: 'flex',
    backgroundColor: 'lightgray',
    borderRadius: '15px',
  },
  image: {
    margin: '0 auto',
    width: '300px',
    height: '300px',
    paddingTop: '(3 / 4 * 100%)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // marginTop: '-270px',
    // borderRadius: '10px',
  },
  imageDelete: {
    cursor: 'pointer',
    border: 'none',
    marginBottom: '230px',
    marginLeft: '280px',
    position: 'absolute',
    color: 'red',
  },
  noImage: {
    position: 'relative',
    margin: 'auto',
    color: 'gray',
  },
  hoveredStyle: {
    backgroundColor: '#fffff1',
    color: 'white',
    width: '100%',
    height: '250px',
    border: '1px dotted gray',
    display: 'flex',
    borderRadius: '10px',
  },
}
