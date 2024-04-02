import ImageDrop from '@/components/ImageDrop'
import { Button, Input, VStack } from '@yamada-ui/react'
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
  return (
    <>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
        {/* <input {...register('firstName')} placeholder="First Name" /> */}
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section className="section" key={field.id}>
                <ImageDrop />
                <Input
                  placeholder="name"
                  {...register(`product.${index}.name` as const)}
                  className={errors?.product?.[index]?.name ? 'error' : ''}
                  defaultValue={field.name}
                />
                <Input
                  placeholder="size"
                  {...register(`product.${index}.size` as const, {
                    valueAsNumber: true,
                  })}
                  className={errors?.product?.[index]?.size ? 'error' : ''}
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
                  className={errors?.product?.[index]?.remark ? 'error' : ''}
                  defaultValue={field.remark}
                />
                <Input
                  placeholder="image_id"
                  {...register(`product.${index}.image_id` as const)}
                  className={errors?.product?.[index]?.image_id ? 'error' : ''}
                  defaultValue={field.image_id}
                  type="hidden"
                />
                <Button type="button" onClick={() => remove(index)}>
                  DELETE
                </Button>
              </section>
            </div>
          )
        })}

        <button
          type="button"
          onClick={() =>
            append({
              name: '',
              size: '',
              tradePrice: 0,
              retailPrice: 0,
              remark: '',
              image_id: '',
            })
          }
        >
          APPEND
        </button>
        <input type="submit" />
      </VStack>
    </>
  )
}

export default DynamicForm
