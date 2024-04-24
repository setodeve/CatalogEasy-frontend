import { apiRequest } from '@/utils/apiClient'
import type { ImageSelectionData } from '@/types/image-selection'
import type { UserData } from '@/types/user-data'
export const fetchImageData = async () => {
  return apiRequest<ImageSelectionData>('GET', `/product_images`)
}

export const fetchCatalogsData = async () => {
  return apiRequest<string[] | null>('GET', `/catalogs`)
}

export const fetchCatalogData = async (id) => {
  return apiRequest<string[] | null>('GET', `/catalogs/${id}`)
}

export const fetchSessionData = async () => {
  return apiRequest<UserData>('GET', `/auth/sessions`)
}

export const signinUserData = async (data) => {
  return apiRequest('POST', `/auth/sign_in`, data)
}

export const signupUserData = async (data) => {
  return apiRequest('POST', `/auth`, data)
}

export const signoutUserData = async () => {
  return apiRequest('DELETE', `/auth/sign_out`)
}

export const uploadImageData = async (data) => {
  return apiRequest<ImageData>('POST', `/product_images`, data)
}

export const uploadProductData = async (data) => {
  return apiRequest<ImageData>('POST', `/products`, data)
}
