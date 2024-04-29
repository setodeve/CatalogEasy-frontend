export type ProductData = {
  product: {
    name: string
    size: string
    trade_price: number
    retail_price: number
    remark: string
    image: File | string | null
    product_image_id: string | null
  }[]
}

export type ProductInfo = {
  image?: string
  name: string
  size: string
  trade_price: number
  retail_price: number
  remark: string
}
