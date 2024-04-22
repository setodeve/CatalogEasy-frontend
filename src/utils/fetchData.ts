import { apiRequest } from '@/utils/apiClient'
import type { ImageSelectionData } from '@/types/image-selection'

export const fetchImageData = async () => {
  return apiRequest<ImageSelectionData>('GET', `/product_images`)
}

export const fetchCatalogsData = async () => {
  return apiRequest<string[] | null>('GET', `/catalogs`)
}

export const fetchCatalogData = async (id) => {
  return apiRequest<string[] | null>('GET', `/catalogs/${id}`)
}

export const uploadImageData = async (data) => {
  return apiRequest<ImageData>('POST', `/product_images`, data)
}

export const uploadProductData = async (data) => {
  return apiRequest<ImageData>('POST', `/products`, data)
}
