import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const uid = Cookies.get('uid')
    const client = Cookies.get('client')
    const accessToken = Cookies.get('access-token')

    if (uid && client && accessToken) {
      config.headers['uid'] = uid
      config.headers['client'] = client
      config.headers['access-token'] = accessToken
      config.headers['token-type'] = 'Bearer'
    }
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }
    return config
  },
  (error) => Promise.reject(error),
)

export const apiRequest = async <T = unknown, R = unknown>(
  method: string,
  url: string,
  requestData?: T,
  config?: AxiosRequestConfig,
): Promise<R> => {
  try {
    const response = await apiClient.request<R>({
      method,
      url,
      data: requestData,
      ...config,
    })
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(`Failed to fetch: ${error.message || error.toString()}`)
    } else {
      console.error('Error:', error)
      throw new Error('An unexpected error occurred')
    }
  }
}

export default apiClient
