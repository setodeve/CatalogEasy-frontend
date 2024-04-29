export interface ProductData {
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

export interface ProductInfo {
  image: string | undefined | null
  name: string
  size: string
  trade_price: number
  retail_price: number
  remark: string
}

export interface ProductsData extends ProductInfo {
  product_image_id: string | null
}

export interface CatalogProps {
  products: ProductsData[] | null
}
