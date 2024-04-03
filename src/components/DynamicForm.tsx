import ImageDrop from '@/components/ImageDrop'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@yamada-ui/fontawesome'
import { HStack, Input, VStack } from '@yamada-ui/react'
import type { CSSProperties } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

function DynamicForm() {
  type ProductData = {
    product: {
      name: string
      size: string
      tradePrice: number
      retailPrice: number
      remark: string
      image_id: string
    }[]
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
          image_id: '',
        },
      ],
    },
    mode: 'onBlur',
  })
  const { fields, append, remove } = useFieldArray({
    name: 'product',
    control,
  })
  const onSubmit = (data: ProductData) => console.log(data)

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
  let index = -1
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
              append({
                name: '',
                size: '',
                tradePrice: 0,
                retailPrice: 0,
                remark: '',
                image_id: '',
              })
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
              {chunk.map((field) => {
                index++
                return (
                  <VStack key={field.id} style={styles.container}>
                    <Icon
                      type="button"
                      onClick={() => remove(index)}
                      style={styles.delete}
                      icon={faXmark}
                      size="2xl"
                      _media={[{ type: 'print', css: { display: 'none' } }]}
                    />
                    <VStack className="section">
                      <ImageDrop />
                      <Input
                        placeholder="name"
                        {...register(`product.${index}.name` as const)}
                        className={
                          errors?.product?.[index]?.name ? 'error' : ''
                        }
                        defaultValue={field.name}
                      />
                      <Input
                        placeholder="size"
                        {...register(`product.${index}.size` as const)}
                        className={
                          errors?.product?.[index]?.size ? 'error' : ''
                        }
                        defaultValue={field.size}
                      />
                      <Input
                        placeholder="value"
                        type="number"
                        {...register(`product.${index}.tradePrice` as const, {
                          valueAsNumber: true,
                        })}
                        className={
                          errors?.product?.[index]?.tradePrice ? 'error' : ''
                        }
                        defaultValue={field.tradePrice}
                      />
                      <Input
                        placeholder="value"
                        type="number"
                        {...register(`product.${index}.retailPrice` as const, {
                          valueAsNumber: true,
                        })}
                        className={
                          errors?.product?.[index]?.retailPrice ? 'error' : ''
                        }
                        defaultValue={field.retailPrice}
                      />
                      <Input
                        placeholder="remark"
                        {...register(`product.${index}.remark` as const)}
                        className={
                          errors?.product?.[index]?.remark ? 'error' : ''
                        }
                        defaultValue={field.remark}
                      />
                      <Input
                        placeholder="image_id"
                        {...register(`product.${index}.image_id` as const)}
                        className={
                          errors?.product?.[index]?.image_id ? 'error' : ''
                        }
                        defaultValue={field.image_id}
                        type="hidden"
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
