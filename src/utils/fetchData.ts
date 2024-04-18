import { apiRequest } from '@/utils/apiClient'

export const fetchImageData = async () => {
  return apiRequest<ImageData>('GET', `/product_images`)
}

export const uploadImageData = async () => {
  return apiRequest<ImageData>('POST', `/product_images`)
}

export const uploadProductData = async (data) => {
  return apiRequest<ImageData>('POST', `/products`, data)
}
