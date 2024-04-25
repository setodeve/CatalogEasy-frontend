import { apiRequest } from '@/utils/apiClient'
import type { ProductData } from '@/types/product'
import type { SignInData, SignUpData } from '@/types/auth'

export const fetchImageData = async () => {
  return apiRequest('GET', `/product_images`)
}

export const fetchCatalogsData = async () => {
  return apiRequest('GET', `/catalogs`)
}

export const fetchCatalogData = async (id: string) => {
  return apiRequest('GET', `/catalogs/${id}`)
}

export const fetchSessionData = async () => {
  return apiRequest('GET', `/auth/sessions`)
}

export const signinUserData = async (data: SignInData) => {
  return apiRequest('POST', `/auth/sign_in`, data)
}

export const signupUserData = async (data: SignUpData) => {
  return apiRequest('POST', `/auth`, data)
}

export const signoutUserData = async () => {
  return apiRequest('DELETE', `/auth/sign_out`)
}

export const uploadImageData = async (data: FormData) => {
  return apiRequest('POST', `/product_images`, data)
}

export const uploadProductData = async (data: ProductData) => {
  return apiRequest('POST', `/products`, data)
}
