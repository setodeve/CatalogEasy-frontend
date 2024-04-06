import ImageDrop from '@/components/ImageDrop'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@yamada-ui/fontawesome'
import { HStack, Input, VStack } from '@yamada-ui/react'
import type { CSSProperties } from 'react'
import React, { useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
function DynamicForm() {
  type ProductData = {
    product: {
      name: string
      size: string
      tradePrice: number
      retailPrice: number
      remark: string
      image: File | string | null
    }[]
  }
  const formTemplate = {
    name: '',
    size: '',
    tradePrice: 0,
    retailPrice: 0,
    remark: '',
    image: null,
  }
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductData>({
    defaultValues: {
      product: [
        {
          name: '',
          size: '',
          tradePrice: 0,
          retailPrice: 0,
          remark: '',
          image: null,
        },
      ],
    },
    mode: 'onBlur',
  })
  const [imageUpdated, setImageUpdated] = useState(false)
  const { fields, append, remove } = useFieldArray({
    name: 'product',
    control,
  })
  const onSubmit = (e: React.FormEvent<HTMLFormElement>, data: ProductData) =>
    console.log(e, data)

  function splitArrayIntoChunksOfTwo<T>(array: T[]): T[][] {
    return array.reduce((resultArray: T[][], item, index) => {
      const chunkIndex = Math.floor(index / 2)
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []
      }
      resultArray[chunkIndex].push(item)

      return resultArray
    }, [])
  }
  const handleImageChange = (index: number, src: string) => {
    setValue(`product.${index}.image`, src)
    setImageUpdated(!imageUpdated)
  }
  return (
    <>
      <VStack as="form" onSubmit={handleSubmit((e, data) => onSubmit(e, data))}>
        <HStack
          _media={[{ type: 'print', css: { display: 'none' } }]}
          style={{
            padding: '1px',
            width: '95%',
            zIndex: 1000,
            justifyContent: 'space-between',
          }}
          position="sticky"
          top="10"
          marginLeft={30}
        >
          <Icon
            type="button"
            onClick={() => {
              append(formTemplate)
            }}
            icon={faPlus}
            size="2xl"
            style={{
              borderRadius: '100px',
              backgroundColor: '#7bc0f9',
              padding: '10px',
              color: 'white',
              cursor: 'pointer',
            }}
          />
          <Input
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
          />
        </HStack>

        {splitArrayIntoChunksOfTwo(fields).map((chunk, chunkIndex) => {
          return (
            <div key={`chunk-${chunkIndex}`} className="page">
              {chunk.map((f, fieldIndex) => {
                const absoluteIndex = chunkIndex * 2 + fieldIndex
                return (
                  <VStack key={f.id} style={styles.container}>
                    <h5>{`No.${absoluteIndex}`}</h5>
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

                      <Input
                        placeholder="name"
                        {...register(`product.${absoluteIndex}.name` as const)}
                        className={
                          errors?.product?.[absoluteIndex]?.name ? 'error' : ''
                        }
                        defaultValue={f.name}
                      />
                      <Input
                        placeholder="size"
                        {...register(`product.${absoluteIndex}.size` as const)}
                        className={
                          errors?.product?.[absoluteIndex]?.size ? 'error' : ''
                        }
                        defaultValue={f.size}
                      />
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
            </div>
          )
        })}
      </VStack>
    </>
  )
}

export default DynamicForm
const styles: Record<string, CSSProperties> = {
  container: {
    margin: '0 auto',
  },
  delete: {
    cursor: 'pointer',
    border: 'none',
    marginTop: '10px',
    marginLeft: '620px',
    position: 'absolute',
    color: 'red',
  },
}
