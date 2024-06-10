import CSVDataTable from '@/components/CSVDataTable'
import Catalog from '@/components/Catalog'
import ImageDrop from '@/components/ImageDrop'
import type { ProductData } from '@/types/product'
import { splitArrayIntoChunksOfSix } from '@/utils/productInfo'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Icon as FontAwesomeIcon, Icon } from '@yamada-ui/fontawesome'
import {
  Button,
  HStack,
  Input,
  VStack,
  SimpleGrid,
  GridItem,
  Textarea,
} from '@yamada-ui/react'
import type { CSSProperties } from 'react'
import { useState, useCallback } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
export default function DynamicForm() {
  const formTemplate = {
    name: '',
    size: '',
    trade_price: 0,
    retail_price: 0,
    remark: '',
    image: null,
    product_image_id: null,
  }
  const {
    register,
    control,
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

  const handleImageChange = useCallback(
    (index: number, src: string | null, id: string | null) => {
      setValue(`product.${index}.image`, src)
      setValue(`product.${index}.product_image_id`, id)
      setImageUpdated(!imageUpdated)
    },
    [imageUpdated, setValue],
  )
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
        className="printCatalog"
        style={{
          display: 'block',
        }}
      >
        <HStack
          _media={[{ type: 'print', css: { display: 'none' } }]}
          style={{
            width: '120%',
            zIndex: 1,
            margin: '20px 20px',
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
            // @ts-expect-error function from react-hook-form
            render={() => <CSVDataTable append={append} />}
          />

          <Catalog
            // @ts-expect-error function from react-hook-form
            productInfo={getValues('product')}
          />
        </HStack>
        {splitArrayIntoChunksOfSix(fields).map((chunk, chunkIndex) => {
          return (
            <SimpleGrid
              key={`chunk-${chunkIndex}`}
              className="page"
              columns={{ base: 3, md: 1 }}
              gap="md"
            >
              {chunk.map((f, fieldIndex) => {
                const absoluteIndex = chunkIndex * 6 + fieldIndex
                return (
                  <GridItem key={f.id} w="full" h="4xs">
                    <h5>{`No.${absoluteIndex + 1}`}</h5>
                    <Icon
                      type="button"
                      onClick={() => {
                        remove(absoluteIndex)
                      }}
                      style={styles.delete}
                      icon={faXmark}
                      size="xl"
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

                      <VStack>
                        <Input
                          placeholder="製品名"
                          {...register(
                            `product.${absoluteIndex}.name` as const,
                          )}
                          className={
                            errors?.product?.[absoluteIndex]?.name
                              ? 'error'
                              : ''
                          }
                          size="sm"
                          defaultValue={f.name}
                        />
                        <Input
                          placeholder="サイズ"
                          {...register(
                            `product.${absoluteIndex}.size` as const,
                          )}
                          className={
                            errors?.product?.[absoluteIndex]?.size
                              ? 'error'
                              : ''
                          }
                          size="sm"
                          defaultValue={f.size}
                        />
                      </VStack>
                      <HStack>
                        <Input
                          placeholder="卸価格"
                          type="number"
                          {...register(
                            `product.${absoluteIndex}.trade_price` as const,
                            {
                              valueAsNumber: true,
                            },
                          )}
                          className={
                            errors?.product?.[absoluteIndex]?.trade_price
                              ? 'error'
                              : ''
                          }
                          size="xs"
                          defaultValue={f.trade_price}
                        />
                        <Input
                          placeholder="小売価格"
                          type="number"
                          {...register(
                            `product.${absoluteIndex}.retail_price` as const,
                            {
                              valueAsNumber: true,
                            },
                          )}
                          className={
                            errors?.product?.[absoluteIndex]?.retail_price
                              ? 'error'
                              : ''
                          }
                          size="xs"
                          defaultValue={f.retail_price}
                        />
                      </HStack>
                      <Textarea
                        placeholder="備考"
                        {...register(
                          `product.${absoluteIndex}.remark` as const,
                        )}
                        className={
                          errors?.product?.[absoluteIndex]?.remark
                            ? 'error'
                            : ''
                        }
                        size="xs"
                        defaultValue={f.remark}
                      />
                    </VStack>
                  </GridItem>
                )
              })}
            </SimpleGrid>
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
    marginLeft: '230px',
    gap: '0px',
    color: 'red',
  },
}
