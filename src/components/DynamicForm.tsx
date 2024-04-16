import CSVDataTable from '@/components/CSVDataTable'
import Catalog from '@/components/Catalog'
import ImageDrop from '@/components/ImageDrop'
import type { ProductData } from '@/types/product'
import { splitArrayIntoChunksOfTwo } from '@/utils/productInfo'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Icon as FontAwesomeIcon, Icon } from '@yamada-ui/fontawesome'
import { Box, Button, HStack, Input, VStack } from '@yamada-ui/react'
import type { CSSProperties } from 'react'
import { useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
export default function DynamicForm() {
  const formTemplate = {
    name: '',
    size: '',
    tradePrice: 0,
    retailPrice: 0,
    remark: '',
    image: null,
    imageId: null,
  }
  const {
    register,
    control,
    // handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ProductData>({
    defaultValues: {
      product: [formTemplate],
    },
    mode: 'onBlur',
  })
  const [imageUpdated, setImageUpdated] = useState(false)
  const { fields, append, remove } = useFieldArray({
    name: 'product',
    control,
  })
  // const onSubmit = (e: React.FormEvent<HTMLFormElement>, data: ProductData) => {
  //   console.log(e, data)
  // }

  const handleImageChange = (index: number, src: string, id: string) => {
    setValue(`product.${index}.image`, src)
    setValue(`product.${index}.imageId`, id)
    setImageUpdated(!imageUpdated)
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
      <VStack
        as="form"
        // onSubmit={handleSubmit((e, data) => onSubmit(e, data))}
        // style={styles.test}
        // _media={[{ type: 'print', css: { width: '100%' } }]}
        className="printCatalog"
        style={{
          display: 'block',
        }}
      >
        <HStack
          _media={[{ type: 'print', css: { display: 'none' } }]}
          style={{
            width: '50%',
            justifyContent: 'space-between',
            zIndex: 1,
            margin: '20px auto 0 auto',
          }}
          position="sticky"
          top="7"
        >
          <Button
            onClick={() => {
              append(formTemplate)
            }}
            leftIcon={<FontAwesomeIcon icon={faPlus} />}
            colorScheme="primary"
            style={{
              borderRadius: '100px',
              padding: '10px',
            }}
          />
          <Controller
            name="product"
            control={control}
            render={() => <CSVDataTable append={append} />}
          />
          {/* <Input
            type="submit"
            value="submit"
            maxWidth="100"
            style={{
              backgroundColor: '#7bc0f9',
              color: 'white',
              cursor: 'pointer',
              textAlign: 'center',
              border: 0,
            }}
          /> */}
          <Catalog productInfo={getValues('product')} />
        </HStack>

        {splitArrayIntoChunksOfTwo(fields).map((chunk, chunkIndex) => {
          return (
            <Box key={`chunk-${chunkIndex}`} className="page">
              {chunk.map((f, fieldIndex) => {
                const absoluteIndex = chunkIndex * 2 + fieldIndex
                return (
                  <VStack key={f.id} style={{ marginTop: '20px' }}>
                    <h5>{`No.${absoluteIndex + 1}`}</h5>
                    <Icon
                      type="button"
                      onClick={() => {
                        remove(absoluteIndex)
                      }}
                      style={styles.delete}
                      icon={faXmark}
                      size="2xl"
                      _media={[{ type: 'print', css: { display: 'none' } }]}
                    />
                    <VStack className="section">
                      <Controller
                        name={`product.${absoluteIndex}.image`}
                        control={control}
                        render={() => (
                          <ImageDrop
                            index={absoluteIndex}
                            change={handleImageChange}
                          />
                        )}
                      />

                      <HStack>
                        <Input
                          placeholder="name"
                          {...register(
                            `product.${absoluteIndex}.name` as const,
                          )}
                          className={
                            errors?.product?.[absoluteIndex]?.name
                              ? 'error'
                              : ''
                          }
                          defaultValue={f.name}
                        />
                        <Input
                          placeholder="size"
                          {...register(
                            `product.${absoluteIndex}.size` as const,
                          )}
                          className={
                            errors?.product?.[absoluteIndex]?.size
                              ? 'error'
                              : ''
                          }
                          defaultValue={f.size}
                        />
                      </HStack>
                      <HStack>
                        <Input
                          placeholder="tradePrice"
                          type="number"
                          {...register(
                            `product.${absoluteIndex}.tradePrice` as const,
                            {
                              valueAsNumber: true,
                            },
                          )}
                          className={
                            errors?.product?.[absoluteIndex]?.tradePrice
                              ? 'error'
                              : ''
                          }
                          defaultValue={f.tradePrice}
                        />
                        <Input
                          placeholder="retailPrice"
                          type="number"
                          {...register(
                            `product.${absoluteIndex}.retailPrice` as const,
                            {
                              valueAsNumber: true,
                            },
                          )}
                          className={
                            errors?.product?.[absoluteIndex]?.retailPrice
                              ? 'error'
                              : ''
                          }
                          defaultValue={f.retailPrice}
                        />
                      </HStack>
                      <Input
                        placeholder="remark"
                        {...register(
                          `product.${absoluteIndex}.remark` as const,
                        )}
                        className={
                          errors?.product?.[absoluteIndex]?.remark
                            ? 'error'
                            : ''
                        }
                        defaultValue={f.remark}
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
}
