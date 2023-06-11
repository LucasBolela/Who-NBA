import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"
import { getAuth, removeAuth, setAccessToken } from "../auth/storage"
import { AuthRequest } from "./auth"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
})

export const pureAxios = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
})

export async function fetcher<T>(
  promise: Promise<T>
): Promise<
  { data: T; error: null } | { data: null; error: Error | AxiosError }
> {
  try {
    const data = await promise
    return { data, error: null }
  } catch (error: any) {
    if (axios.isAxiosError(error))
      return { data: null, error: error.response?.data }
    return { data: null, error }
  }
}

export async function request(options: AxiosRequestConfig) {
  const onSuccess = (response: AxiosResponse) => {
    return response.data
  }
  const onError = (error: AxiosError<{ message: string }>) => {
    return Promise.reject(error)
  }
  return axiosInstance(options).then(onSuccess).catch(onError)
}

export async function pureRequest(options: AxiosRequestConfig) {
  const onSuccess = (response: AxiosResponse) => {
    return response.data
  }
  const onError = (error: AxiosError<{ message: string }>) => {
    return Promise.reject(error)
  }
  return pureAxios(options).then(onSuccess).catch(onError)
}

const accessTokenInterceptor = (config: InternalAxiosRequestConfig) => {
  const { access_token } = getAuth()
  config.headers.Authorization = `Bearer ${access_token}`
  return config
}

axiosInstance.defaults.headers.common["Content-Type"] = "application/json"

axiosInstance.interceptors.request.use(accessTokenInterceptor)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        const { refresh_token } = getAuth()
        if (!refresh_token) {
          removeAuth()
          Promise.reject(error)
          return window.location.replace("/login")
        }
        const { data, error: refresh_error } = await fetcher(
          AuthRequest.refreshToken(refresh_token)
        )
        if (refresh_error) {
          removeAuth()
          Promise.reject(error)
          return window.location.replace("/login")
        } else {
          const access_token = data.access_token
          setAccessToken(access_token)
          axiosInstance.interceptors.request.use(accessTokenInterceptor)
          return window.location.reload()
        }
      }
    }
    return Promise.reject(error)
  }
)
