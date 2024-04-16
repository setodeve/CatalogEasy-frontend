export type ProductData = {
  product: {
    name: string
    size: string
    tradePrice: number
    retailPrice: number
    remark: string
    image: File | string | null
    imageId: string | null
  }[]
}
