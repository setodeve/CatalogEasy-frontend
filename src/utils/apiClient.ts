import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import Cookies from 'js-cookie'
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    // const token: string | null = localStorage.getItem('token')
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`
    // }
    const uid = Cookies.get('uid')
    const client = Cookies.get('client')
    const accessToken = Cookies.get('access-token')

    if (uid && client && accessToken) {
      config.headers['uid'] = uid
      config.headers['client'] = client
      config.headers['access-token'] = accessToken
      config.headers['token-type'] = 'Bearer'
    } else {
      config.headers['uid'] = ''
      config.headers['client'] = ''
      config.headers['access-token'] = ''
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const apiRequest = async <T = unknown, R = AxiosResponse<T>>(
  method: string,
  url: string,
  requestData?: T,
  config?: AxiosRequestConfig,
): Promise<R> => {
  try {
    const response: AxiosResponse<R> = await apiClient({
      method: method as string,
      url,
      data: requestData,
      ...config,
    })
    return response.data
  } catch (error) {
    console.log(process.env.NEXT_PUBLIC_API_ENDPOINT)
    throw new Error(`Failed to fetch: ${error}`)
  }
}

export default apiClient
