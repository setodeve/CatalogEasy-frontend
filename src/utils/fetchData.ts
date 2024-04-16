import { apiRequest } from '@/utils/apiClient'

export const fetchImageData = async () => {
  return apiRequest<ImageData>('GET', `/product_images`)
}
