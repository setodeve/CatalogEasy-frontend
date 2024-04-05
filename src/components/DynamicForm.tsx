import ImageDrop from '@/components/ImageDrop'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@yamada-ui/fontawesome'
import { HStack, Input, VStack } from '@yamada-ui/react'
import type { CSSProperties } from 'react'
import React from 'react'
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
  const { fields, append, update, remove } = useFieldArray({
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

  return (
    <>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
        <HStack
          _media={[{ type: 'print', css: { display: 'none' } }]}
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
          />
          <Input
            type="submit"
            value="submit"
            maxWidth="100"
            colorScheme="primary"
          />
        </HStack>

        {splitArrayIntoChunksOfTwo(fields).map((chunk, chunkIndex) => {
          return (
            <div key={`chunk-${chunkIndex}`} className="page">
              {chunk.map((f, fieldIndex) => {
                // index++
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
                        render={({ field }) => (
                          <ImageDrop
                            product={fields}
                            field={field}
                            update={update}
                            index={absoluteIndex}
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
