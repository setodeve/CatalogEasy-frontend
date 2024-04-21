import { apiRequest } from '@/utils/apiClient'
import { type } from 'os'

export const fetchImageData = async () => {
  return apiRequest<ImageData>('GET', `/product_images`)
}

export const uploadImageData = async (data) => {
  return apiRequest<ImageData>('POST', `/product_images`, data)
}

export const uploadProductData = async (data) => {
  return apiRequest<ImageData>('POST', `/products`, data)
}
